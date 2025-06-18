require 'net/http'
require 'json'
require 'active_support/time'
require 'yaml' # Add this for writing YAML files

module Jekyll
  class BlueskyPostFetcher < Generator
    safe true
    priority :high

    BLUESKY_API_URL = 'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed'
    ACTOR_DID = 'did:plc:dvbmys5jbj5obqcim6venar5' # Your Bluesky DID

    def generate(site)
      Jekyll.logger.info 'Bluesky:', "Fetching latest post for #{ACTOR_DID}"
      Time.zone = 'Asia/Kolkata'

      uri = URI(BLUESKY_API_URL)
      uri.query = URI.encode_www_form({
                                        'actor' => ACTOR_DID,
                                        'limit' => 1,
                                        'filter' => 'posts_no_replies'
                                      })

      output_file_path = File.join(site.source, '_data', 'bluesky_latest_post.yml')

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

          post_timestamp = ist_time.iso8601 # Store as ISO 8601 string for YAML

          # Convert the URI
          public_url = convert_at_uri_to_bsky_url(at_uri)
          Jekyll.logger.debug 'Bluesky Debug:', "Converted Public URL: #{public_url.inspect}"

          fetched_data = {
            'text' => post_text,
            'uri' => public_url,
            'timestamp' => post_timestamp
          }

          # --- NEW CRITICAL PART: Write data to file ---
          # Check if the existing file content is different from the new data
          existing_content = nil
          if File.exist?(output_file_path)
            begin
              existing_content = YAML.load_file(output_file_path)
            rescue Psych::SyntaxError => e
              Jekyll.logger.warn 'Bluesky:',
                                 "Existing _data/bluesky_latest_post.yml is not valid YAML: #{e.message}. Overwriting."
              existing_content = nil # Force overwrite if invalid
            end
          end

          if existing_content != fetched_data
            File.write(output_file_path, fetched_data.to_yaml)
            Jekyll.logger.info 'Bluesky:', 'Successfully updated _data/bluesky_latest_post.yml with latest post.'
          else
            Jekyll.logger.info 'Bluesky:', 'No change in latest post. _data/bluesky_latest_post.yml not updated.'
          end
          # --- END NEW CRITICAL PART ---

          # This line is good for Liquid access during the current build, but not for file persistence
          site.data['bluesky_latest_post'] = fetched_data

        else
          Jekyll.logger.warn 'Bluesky:', "No posts found for #{ACTOR_DID} with filter 'posts_no_replies'."
          # If no posts found, you might want to clear the file or leave it as is.
          # For now, let's leave the existing file to avoid unnecessary commits if no new posts.
          # site.data['bluesky_latest_post'] = nil
        end
      rescue StandardError => e
        Jekyll.logger.error 'Bluesky Error:', "Failed to fetch or write post: #{e.message}"
        # site.data['bluesky_latest_post'] = nil # Set to nil for current build if error
      end
    end

    # Helper method to convert at:// URI to bsky.app URL
    def convert_at_uri_to_bsky_url(at_uri)
      return nil unless at_uri

      # Split the URI by '/'
      # Example: at://did:plc:dvbmys5jbj5obqcim6venar5/app.bsky.feed.post/3lpt2chib5b2w
      # parts will be ["at:", "", "did:plc:dvbmys5jbj5obqcim6venar5", "app.bsky.feed.post", "3lpt2chib5b2w"]
      parts = at_uri.split('/')
      Jekyll.logger.debug 'Bluesky Debug:', "URI parts: #{parts.inspect}"

      if parts.length == 5 && parts[0] == 'at:' && parts[3] == 'app.bsky.feed.post'
        did = parts[2] # Corrected index for DID
        rkey = parts[4]
        "https://bsky.app/profile/#{did}/post/#{rkey}"
      else
        Jekyll.logger.warn 'Bluesky Converter:', "Unrecognized at:// URI format: #{at_uri}"
        nil
      end
    end
  end
end
