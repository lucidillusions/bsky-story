# _plugins/bluesky_post_fetcher.rb

require 'net/http'
require 'json'
require 'active_support/time' # Required for in_time_zone
require 'yaml'       # NEW: Required for writing YAML files
require 'fileutils'  # NEW: Required for FileUtils.mkdir_p

module Jekyll
  class BlueskyPostFetcher < Generator
    safe true
    priority :high

    BLUESKY_API_URL = "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed"
    ACTOR_DID = "did:plc:dvbmys5jbj5obqcim6venar5" # Your Bluesky DID

    def generate(site)
      Jekyll.logger.info "Bluesky:", "Fetching latest post for #{ACTOR_DID}"

      # Set the desired timezone for conversion within this generator
      Time.zone = 'Asia/Kolkata'

      uri = URI(BLUESKY_API_URL)
      uri.query = URI.encode_www_form({
        'actor' => ACTOR_DID,
        'limit' => 1,
        'filter' => 'posts_no_replies'
      })

      latest_post_data = nil # Initialize a variable to hold the data hash

      begin
        response = Net::HTTP.get(uri)
        data = JSON.parse(response)

        if data['feed'] && !data['feed'].empty?
          latest_post_record = data['feed'][0]['post']['record']
          post_text = latest_post_record['text']
          at_uri = data['feed'][0]['post']['uri']
          utc_timestamp_str = latest_post_record['createdAt']

          utc_time = Time.parse(utc_timestamp_str).utc # Parse and ensure it's UTC
          ist_time = utc_time.in_time_zone('Asia/Kolkata') # Convert to IST Time object

          public_url = convert_at_uri_to_bsky_url(at_uri)

          latest_post_data = { # Prepare the data hash
            'text' => post_text,
            'uri' => public_url,
            'timestamp' => ist_time
          }
          Jekyll.logger.info "Bluesky:", "Successfully fetched latest post."
        else
          Jekyll.logger.warn "Bluesky:", "No posts found for #{ACTOR_DID} with filter 'posts_no_replies'."
          latest_post_data = nil # Explicitly set to nil if no data
        end

        # --- NEW LOGIC: Explicitly write the data to the _data file ---
        # Construct the full path to the _data directory relative to the site source
        data_dir = File.join(site.source, '_data')
        # Ensure the _data directory exists
        FileUtils.mkdir_p(data_dir) unless File.directory?(data_dir)

        # Define the full path for the YAML file
        file_path = File.join(data_dir, 'bluesky_latest_post.yml')

        if latest_post_data # If data was successfully fetched, write it
          File.open(file_path, 'w') do |file|
            file.write(latest_post_data.to_yaml) # Convert hash to YAML and write
          end
          Jekyll.logger.info "Bluesky:", "Updated _data/bluesky_latest_post.yml"
        else
          # If no data was fetched, optionally delete the old file to clear stale data
          File.delete(file_path) if File.exist?(file_path)
          Jekyll.logger.info "Bluesky:", "No new post found. Removed _data/bluesky_latest_post.yml (if it existed)."
        end
        # --- END NEW LOGIC ---

        # This assignment to site.data is still useful for Liquid templates within the same build process
        site.data['bluesky_latest_post'] = latest_post_data

      rescue StandardError => e
        Jekyll.logger.error "Bluesky Error:", "Failed to fetch or write post: #{e.message}"
        # Optionally, you might want to handle existing file here, e.g., keep it if error occurs
        site.data['bluesky_latest_post'] = nil # Clear data in memory for this build if error
      end
    end

    # Helper method (no change here)
    def convert_at_uri_to_bsky_url(at_uri)
      return nil unless at_uri
      parts = at_uri.split('/')
      if parts.length == 5 && parts[0] == 'at:' && parts[3] == 'app.bsky.feed.post'
        did = parts[2]
        rkey = parts[4]
        "https://bsky.app/profile/#{did}/post/#{rkey}"
      else
        Jekyll.logger.warn "Bluesky Converter:", "Unrecognized at:// URI format: #{at_uri}"
        nil
      end
    end
  end
end
