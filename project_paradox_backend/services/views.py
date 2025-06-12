# services/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ServiceAgent
from .serializers import ServiceAgentSerializer

class ServiceAgentListView(APIView):
    def get(self, request):
        agents = ServiceAgent.objects.all()
        serializer = ServiceAgentSerializer(agents, many=True)
        return Response(serializer.data)
