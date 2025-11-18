import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trophy, Download, Filter, Calendar, Search, AlertTriangle } from "lucide-react";
import { useExamResults } from "@/hooks/useExamResults";

interface ResultsViewerProps {
  userRole: 'teacher' | 'student';
  currentUser?: any;
}

const ResultsViewer = ({ userRole, currentUser }: ResultsViewerProps) => {
  const { results } = useExamResults(userRole, currentUser);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter results based on search query
  const filteredResults = results.filter(result => {
    if (userRole === 'teacher') {
      // For teachers, search by student name or username
      return searchQuery === "" || 
        result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.studentUsername.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      // For students, search by exam title
      return searchQuery === "" || 
        result.examTitle.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {userRole === 'teacher' ? 'Student Results' : 'My Results'}
            </CardTitle>
            <CardDescription>
              {userRole === 'teacher' 
                ? 'View exam results from your students' 
                : 'Your completed exam results'}
            </CardDescription>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={userRole === 'teacher' ? "Search by student name..." : "Search by exam title..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredResults.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {results.length === 0 ? 'No Results Available' : 'No Results Found'}
            </h3>
            <p className="text-muted-foreground">
              {results.length === 0 
                ? (userRole === 'teacher' 
                    ? 'Student results will appear here once exams are taken.' 
                    : 'Your exam results will appear here after completion.')
                : 'Try adjusting your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Card key={result.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{result.examTitle}</h4>
                        {result.status === 'disqualified' && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            Disqualified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {userRole === 'teacher' 
                          ? `Student: ${result.studentName} (@${result.studentUsername})` 
                          : `Completed: ${new Date(result.completedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={result.status === 'disqualified' ? "destructive" : (result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive")}>
                        {result.score}%
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsViewer;