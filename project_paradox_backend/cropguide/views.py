# cropguide/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['POST'])
def fetch_crop_info(request):
    crop = request.data.get('crop')
    if not crop:
        return Response({"error": "Crop name is required"}, status=400)

    # 👇 YouTube Data API
    YOUTUBE_API_KEY = "AIzaSyBYPRAhzrvhNU0n8fH3H70dftfD4pg3q2c"
    search_query = f"how to grow {crop}"
    youtube_url = (
        f"https://www.googleapis.com/youtube/v3/search"
        f"?part=snippet&q={search_query}&maxResults=5&key={YOUTUBE_API_KEY}"
    )

    yt_response = requests.get(youtube_url).json()
    video_results = []

    for item in yt_response.get("items", []):
        if "videoId" in item["id"]:
            video_results.append({
                "title": item["snippet"]["title"],
                "videoId": item["id"]["videoId"],
                "thumbnail": item["snippet"]["thumbnails"]["high"]["url"],
                "channel": item["snippet"]["channelTitle"]
            })

    # 👇 Google Search Article Snippets from SerpApi
    SERP_API_KEY = "5f09756363715ee5e28491a5d7d401d290c9852e36b8ca3d2a8eef725d41b059"
    serpapi_url = "https://serpapi.com/search.json"
    serp_params = {
        "q": f"how to grow {crop} efficiently",
        "api_key": SERP_API_KEY,
    }

    articles = []
    try:
        serp_response = requests.get(serpapi_url, params=serp_params)
        serp_data = serp_response.json()
        for item in serp_data.get("organic_results", []):
            articles.append({
                "title": item.get("title"),
                "url": item.get("link"),
                "snippet": item.get("snippet", "")
            })
    except Exception as e:
        articles.append({"title": "Error fetching articles", "url": "", "snippet": str(e)})

    return Response({
        "videos": video_results,
        "articles": articles
    })
