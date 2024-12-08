import os
from flask import Flask, render_template, request
import requests
from dotenv import load_dotenv

# TODO
# - Get Ticketmaster API to work... done!
# - Get Amadeus Hotel API to work
# - Fix CSS to make it look pretty!

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Ticketmaster API
TICKETMASTER_API_KEY = "fuDhyQsrlyPj2c8vFLOtKZsKfApDkpQj"  # Replace with your API key
BASE_URL_TICKETMASTER = "https://app.ticketmaster.com/discovery/v2/events.json"


def get_seattle_attractions(start_date=None, end_date=None):
    params = {
        "city": "Seattle",  # Search for events in Seattle
        "checkInDate": start_date,
        "checkOutDate": end_date,
        "apikey": TICKETMASTER_API_KEY,  # API Key
    }
    response = requests.get(BASE_URL_TICKETMASTER, params=params)
    if response.status_code == 200:
        data = response.json()
        return data["_embedded"]["events"] if "_embedded" in data else []
    else:
        print(f"Error fetching events: {response.status_code}, {response.json()}")
        return []

# Flask route to show the home page (search form)
@app.route('/test')
def test_page():
    return "Flask is working!"


@app.route('/', methods=['GET', 'POST'])


def home_page():
    # print("this is the home page?")
    print("Home page route is triggered")
   
    return  render_template('home.html')

@app.route('/search', methods=['GET', 'POST'])
def search_page():
    if request.method == 'POST':
        start_date = request.form['start_date']  # User input for start date
        end_date = request.form['end_date']  # User input for end date

        # Get events in Seattle for the specified date range
        events = get_seattle_attractions(start_date, end_date)

        # Get hotels in Seattle
       # hotels = get_seattle_hotels(start_date, end_date)


        # Pass both events and hotels to the results page
        return render_template('results.html', events=events)
    
    # Render the home page with the search form
    return render_template('index.html')

@app.route('/events')
def events_page():
    # Render the results.html template with events passed from the search_page
    return render_template('results.html')
# Runs Flask app
if __name__ == "__main__":
    app.run(debug=True)
