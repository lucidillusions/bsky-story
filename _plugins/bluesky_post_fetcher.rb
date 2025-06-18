require 'net/http'
require 'json'
require 'active_support/time'

module Jekyll
  class BlueskyPostFetcher < Generator
    safe true
    priority :high

    BLUESKY_API_URL = 'https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed'
    ACTOR_DID = 'did:plc:dvbmys5jbj5obqcim6venar5' # Your Bluesky DID (already correct from your logs)

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

          site.data['bluesky_latest_post'] = {
            'text' => post_text,
            'uri' => public_url, # <--- THIS MUST BE public_url
            'timestamp' => post_timestamp
          }
          Jekyll.logger.info 'Bluesky:', 'Successfully fetched latest post.'
        else
          Jekyll.logger.warn 'Bluesky:', "No posts found for #{ACTOR_DID} with filter 'posts_no_replies'."
          site.data['bluesky_latest_post'] = nil
        end
      rescue StandardError => e
        Jekyll.logger.error 'Bluesky Error:', "Failed to fetch post: #{e.message}"
        site.data['bluesky_latest_post'] = nil
      end
    end

    # --- CRITICAL PART: THE HELPER METHOD ---
    # Helper method to convert at:// URI to bsky.app URL
    def convert_at_uri_to_bsky_url(at_uri)
      return nil unless at_uri

      # Split the URI by '/'
      parts = at_uri.split('/')
      Jekyll.logger.debug 'Bluesky Debug:', "URI parts: #{parts.inspect}" # Added for more debugging

      # Expected format: ["at:", "", "did:plc:...", "app.bsky.feed.post", "rkey"]
      # Or if split handles double slash as empty string: ["at:", "", "did:plc:...", "app.bsky.feed.post", "3lpt2chib5b2w"]
      # The original split is correct if it results in something like: ["at:", "did:plc:...", "app.bsky.feed.post", "3lpt2chib5b2w"]
      # Let's re-evaluate the splitting pattern

      # A more robust approach using Ruby's URI parsing or regex
      # For now, let's assume the current split logic is correct and adjust indexing.
      # Based on the original URI `at://did:plc:dvbmys5jbj5obqcim6venar5/app.bsky.feed.post/3lpt2chib5b2w`
      # `at_uri.split('/')` will produce:
      # ["at:", "", "did:plc:dvbmys5jbj5obqcim6venar5", "app.bsky.feed.post", "3lpt2chib5b2w"]
      # So, parts[2] is DID, parts[4] is RKEY, and length is 5.

      if parts.length == 5 && parts[0] == 'at:' && parts[3] == 'app.bsky.feed.post'
        did = parts[2] # Corrected index
        rkey = parts[4]
        "https://bsky.app/profile/#{did}/post/#{rkey}"
      else
        Jekyll.logger.warn 'Bluesky Converter:', "Unrecognized at:// URI format: #{at_uri}"
        nil
      end
    end
    # --- END CRITICAL PART ---
  end
end
