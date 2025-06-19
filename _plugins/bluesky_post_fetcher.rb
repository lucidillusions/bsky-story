require 'net/http'
require 'json'
require 'active_support/time'
require 'yaml' # Add this line to require the YAML library

module Jekyll
  class BlueskyPostFetcher < Generator
    safe true
    priority :high

    BLUESKY_API_URL = 'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed'
    ACTOR_DID = 'did:plc:dvbmys5jbj5obqcim6venar5' # Your Bluesky DID (already correct from your logs)
    DATA_FILE_PATH = '_data/bluesky_latest_post.yml' # Define the path for the data file

    def generate(site)
      Jekyll.logger.info 'Bluesky:', "Fetching latest post for #{ACTOR_DID}"
      Time.zone = 'Asia/Kolkata'

      uri = URI(BLUESKY_API_URL)
      uri.query = URI.encode_www_form({
                                        'actor' => ACTOR_DID,
                                        'limit' => 1,
                                        'filter' => 'posts_no_replies'
                                      })

      begin
        response = Net::HTTP.get(uri)
        data = JSON.parse(response)

        if data['feed'] && !data['feed'].empty?
          latest_post_record = data['feed'][0]['post']['record']
          post_text = latest_post_record['text']
          at_uri = data['feed'][0]['post']['uri'] # Get the 'at://' URI
          utc_timestamp_str = latest_post_record['createdAt']

          utc_time = Time.parse(utc_timestamp_str).utc
          ist_time = utc_time.in_time_zone('Asia/Kolkata')

          post_timestamp = ist_time

          # --- CRITICAL PART: CONVERT THE URI ---
          public_url = convert_at_uri_to_bsky_url(at_uri)
          Jekyll.logger.debug 'Bluesky Debug:', "Converted Public URL: #{public_url.inspect}"
          # --- END CRITICAL PART ---

          # Prepare the data to be saved to YAML
          bluesky_data = {
            'text' => post_text,
            'uri' => public_url,
            'timestamp' => post_timestamp.iso8601 # Save timestamp in a standard format
          }

          # Save the data to the _data directory
          FileUtils.mkdir_p(File.dirname(DATA_FILE_PATH)) # Ensure _data directory exists
          File.open(DATA_FILE_PATH, 'w') do |file|
            file.write(bluesky_data.to_yaml)
          end
          Jekyll.logger.info 'Bluesky:', "Saved latest post to #{DATA_FILE_PATH}"

          # Also keep it in site.data for immediate build use, though not strictly necessary if file is written
          site.data['bluesky_latest_post'] = bluesky_data
          Jekyll.logger.info 'Bluesky:', 'Successfully fetched and prepared latest post data.'
        else
          Jekyll.logger.warn 'Bluesky:', "No posts found for #{ACTOR_DID} with filter 'posts_no_replies'."
          # Optionally, you could write an empty or specific placeholder file if no posts found
          # to ensure the _data/bluesky_latest_post.yml file always exists.
          site.data['bluesky_latest_post'] = nil
        end
      rescue StandardError => e
        Jekyll.logger.error 'Bluesky Error:', "Failed to fetch post: #{e.message}"
        site.data['bluesky_latest_post'] = nil
      end
    end

    # Helper method to convert at:// URI to bsky.app URL
    def convert_at_uri_to_bsky_url(at_uri)
      return nil unless at_uri

      parts = at_uri.split('/')
      Jekyll.logger.debug 'Bluesky Debug:', "URI parts: #{parts.inspect}"

      if parts.length == 5 && parts[0] == 'at:' && parts[3] == 'app.bsky.feed.post'
        did = parts[2]
        rkey = parts[4]
        "https://bsky.app/profile/#{did}/post/#{rkey}"
      else
        Jekyll.logger.warn 'Bluesky Converter:', "Unrecognized at:// URI format: #{at_uri}"
        nil
      end
    end
  end
end
