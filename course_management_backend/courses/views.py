from rest_framework import generics
from .models import Course, CourseInstance
from .serializers import CourseSerializer, CourseInstanceSerializer

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetailView(generics.RetrieveDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'id'

class CourseInstanceListCreateView(generics.ListCreateAPIView):
    serializer_class = CourseInstanceSerializer

    def get_queryset(self):
        year = self.kwargs['year']
        semester = self.kwargs['semester']
        return CourseInstance.objects.filter(year=year, semester=semester)

class CourseInstanceDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = CourseInstanceSerializer

    def get_queryset(self):
        year = self.kwargs['year']
        semester = self.kwargs['semester']
        course_id = self.kwargs['course_id']
        return CourseInstance.objects.filter(year=year, semester=semester, course_id=course_id)
