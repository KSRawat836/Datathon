from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def sample_api(request):
    return Response({"message": "yo karan, api working ✅"})
