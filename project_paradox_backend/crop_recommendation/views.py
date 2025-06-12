from django.views.decorators.csrf import csrf_exempt
from django.db import connections
from django.http import JsonResponse
import json

@csrf_exempt  
def crop_recommendation(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        location = data.get('location')
        soil_type = data.get('soil_type')

        with connections['paradox_db'].cursor() as cursor:
            query = """
                SELECT suitable_crop, pH, nitrogen, phosphorus, potassium 
                FROM crop_recommendation_croprecommendation
                WHERE location = %s AND soil_type = %s
            """
            cursor.execute(query, [location, soil_type])
            rows = cursor.fetchall()

        if rows:
            recommendations = []
            for row in rows:
                recommendations.append({
                    'suitable_crops': row[0],
                    'pH': row[1],
                    'nitrogen': row[2],
                    'phosphorus': row[3],
                    'potassium': row[4],
                })

            return JsonResponse({'recommendation': recommendations})
        else:
            return JsonResponse({'recommendation': []})
