import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { formatRelativeTime, getColorFromString, getInitials } from '@/lib/utils';
import { StudentSummary, CareerInterestSummary } from '@/types';

export default function TeacherDashboard() {
  const { t } = useTranslation();
  const [selectedClass, setSelectedClass] = useState("class-3a");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch teacher data
  const { data: teacherData, isLoading } = useQuery({
    queryKey: ['/api/teacher/dashboard', selectedClass],
  });

  // Mock data structure
  const dashboardData = teacherData || {
    classStats: {
      totalStudents: 28,
      completedProfiles: 22,
      completionRate: 78,
      careerInterests: 14,
      needGuidance: 6
    },
    topCareerInterests: [
      { name: "Computer Science", count: 8, percentage: 29 },
      { name: "Medicine", count: 6, percentage: 21 },
      { name: "Business Administration", count: 5, percentage: 18 },
      { name: "Engineering", count: 4, percentage: 14 },
      { name: "Education", count: 3, percentage: 11 }
    ],
    students: [
      {
        id: 1,
        fullName: "Amal Benkada",
        studentId: "STU-2023-001",
        progress: 65,
        assessmentsCompleted: 2,
        totalAssessments: 3,
        careerInterests: ["Software Engineering"],
        secondaryInterests: ["Data Science", "AI"],
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 2,
        fullName: "Youssef Alami",
        studentId: "STU-2023-008",
        progress: 30,
        assessmentsCompleted: 1,
        totalAssessments: 3,
        careerInterests: ["Medicine"],
        secondaryInterests: ["Undecided"],
        lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        id: 3,
        fullName: "Leila Mansour",
        studentId: "STU-2023-015",
        progress: 100,
        assessmentsCompleted: 3,
        totalAssessments: 3,
        careerInterests: ["Business Administration"],
        secondaryInterests: ["Marketing", "Finance"],
        lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ]
  };

  // Filter students based on search query
  const filteredStudents = dashboardData.students.filter(student => 
    student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.careerInterests.some(interest => 
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredStudents.length);
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-2">{t('teacher_dashboard')}</h2>
        <p className="text-gray-600">{t('track_support')}</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-poppins font-semibold text-lg">{t('class_overview')}</h3>
            <div className="flex space-x-2">
              <Select
                value={selectedClass}
                onValueChange={setSelectedClass}
              >
                <SelectTrigger className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg w-32">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-3a">Class 3-A</SelectItem>
                  <SelectItem value="class-2b">Class 2-B</SelectItem>
                  <SelectItem value="class-4c">Class 4-C</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                {t('export_report')}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard 
              color="bg-blue-50" 
              textColor="text-primary-500" 
              title={t('total_students')} 
              value={dashboardData.classStats.totalStudents} 
              subtitle={t('in_current_class')} 
            />
            <StatCard 
              color="bg-green-50" 
              textColor="text-secondary-500" 
              title={t('completed_profiles')} 
              value={dashboardData.classStats.completedProfiles} 
              subtitle={`${dashboardData.classStats.completionRate}% ${t('completion_rate')}`} 
            />
            <StatCard 
              color="bg-yellow-50" 
              textColor="text-accent-500" 
              title={t('career_interests')} 
              value={dashboardData.classStats.careerInterests} 
              subtitle={t('unique_career_paths')} 
            />
            <StatCard 
              color="bg-purple-50" 
              textColor="text-purple-500" 
              title={t('need_guidance')} 
              value={dashboardData.classStats.needGuidance} 
              subtitle={t('students_require_attention')} 
            />
          </div>
          
          <h4 className="font-poppins font-medium text-md mb-3">{t('top_career_interests')}</h4>
          <div className="w-full bg-gray-100 rounded-lg p-4">
            <div className="space-y-3">
              {dashboardData.topCareerInterests.map((interest: CareerInterestSummary, index: number) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{interest.name}</span>
                    <span className="text-sm text-gray-500">{interest.count} {t('students')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${interest.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-poppins font-semibold text-lg">{t('student_progress')}</h3>
            <div className="relative">
              <Input
                type="text"
                placeholder={t('search_students')}
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">{t('student')}</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">{t('progress')}</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">{t('career_interests')}</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">{t('last_activity')}</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">{t('action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student: StudentSummary) => {
                  const avatarColor = getColorFromString(student.fullName);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full ${avatarColor} flex items-center justify-center`}>
                            <span className="font-medium text-sm">{getInitials(student.fullName)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                            <div className="text-xs text-gray-500">{student.studentId}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                          <div 
                            className={`h-2 rounded-full ${
                              student.progress >= 80 ? "bg-secondary-500" :
                              student.progress >= 50 ? "bg-primary-500" : "bg-yellow-500"
                            }`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.assessmentsCompleted}/{student.totalAssessments} {t('assessments')} {t('completed')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">{student.careerInterests.join(", ")}</div>
                        <div className="text-xs text-gray-500">{student.secondaryInterests.join(", ")}</div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {formatRelativeTime(student.lastActivity)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-3">
                          <Button variant="link" className="text-primary-500 hover:text-primary-700 p-0 h-auto">
                            {t('view_profile')}
                          </Button>
                          <Button variant="link" className="text-gray-500 hover:text-gray-700 p-0 h-auto">
                            {t('message')}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredStudents.length > 0 && (
            <div className="flex justify-between items-center pt-4 mt-3 border-t">
              <div className="text-sm text-gray-700">
                {t('showing')} <span className="font-medium">{startIndex + 1}</span> {t('to')} <span className="font-medium">{endIndex}</span> {t('of')} <span className="font-medium">{filteredStudents.length}</span> {t('students')}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className="text-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  {t('previous')}
                </Button>
                <Button 
                  variant="outline"
                  className="text-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  {t('next')}
                </Button>
              </div>
            </div>
          )}

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No students found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  color: string;
  textColor: string;
  title: string;
  value: number;
  subtitle: string;
}

function StatCard({ color, textColor, title, value, subtitle }: StatCardProps) {
  return (
    <div className={`${color} rounded-lg p-4`}>
      <div className={`${textColor} text-sm font-medium mb-1`}>{title}</div>
      <div className="font-poppins font-bold text-2xl">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
  );
}
