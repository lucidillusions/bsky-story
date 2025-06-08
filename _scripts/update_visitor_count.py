import os
import json
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
)
from google.oauth2 import service_account

# --- Configuration ---
# Your GA4 Property ID (from GitHub Secret)
PROPERTY_ID = os.environ.get('GA4_PROPERTY_ID')
# The JSON content of your Service Account Key (from GitHub Secret)
SERVICE_ACCOUNT_KEY_JSON = os.environ.get('GA_SERVICE_ACCOUNT_KEY')

# The date from which to start counting sessions from GA4
# This should be a date *before* the 2705 baseline if you want all sessions
# from GA4 to add to 2705. Or, if 2705 is your "historical" base, and you
# only want to add sessions *since a certain point* to it, set this date.
# For simplicity, let's assume this means "all sessions from GA4 since this date".
# Adjust this date as needed, perhaps to the day you set up GA4.
GA_COLLECTION_START_DATE = "2025-06-06" # <<<--- ADJUST THIS DATE!

# The base number to start from for display (your "lost alley" count)
INITIAL_BASE_COUNT = 2705

# Path to the Jekyll data file
OUTPUT_FILE_PATH = "_data/visitor_count.json"

def run_report():
    try:
        # Authenticate using the service account key
        credentials_info = json.loads(SERVICE_ACCOUNT_KEY_JSON)
        credentials = service_account.Credentials.from_service_account_info(credentials_info)

        client = BetaAnalyticsDataClient(credentials=credentials)

        request = RunReportRequest(
            property=f"properties/{PROPERTY_ID}",
            metrics=[Metric(name="sessions")], # You could also use "totalUsers" or "activeUsers"
            date_ranges=[DateRange(start_date=GA_COLLECTION_START_DATE, end_date="today")],
        )

        response = client.run_report(request)

        # Get the total sessions
        if response.rows:
            # Assuming 'sessions' is the only metric and first row contains the total
            total_sessions = int(response.rows[0].metric_values[0].value)
        else:
            total_sessions = 0
            print("No data received from Google Analytics Data API.")

        return total_sessions

    except Exception as e:
        print(f"Error fetching data from Google Analytics: {e}")
        # If there's an error, return -1 or raise an exception to indicate failure
        # For robustness, you might want to return the last known good count
        # or a default, but for now, let's just fail clearly.
        return -1

def main():
    ga_sessions = run_report()

    if ga_sessions != -1: # Only proceed if data fetch was successful
        final_display_count = INITIAL_BASE_COUNT + ga_sessions

        # Prepare data for Jekyll
        data_to_save = {"total_visitors": final_display_count}

        # Ensure _data directory exists
        os.makedirs(os.path.dirname(OUTPUT_FILE_PATH), exist_ok=True)

        with open(OUTPUT_FILE_PATH, "w") as f:
            json.dump(data_to_save, f, indent=2)

        print(f"Successfully updated {OUTPUT_FILE_PATH} with count: {final_display_count}")
    else:
        print("Failed to update visitor count due to GA data fetch error.")


if __name__ == "__main__":
    main()
