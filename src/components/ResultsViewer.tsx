import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Download, Filter, Calendar } from "lucide-react";
import { useExamResults } from "@/hooks/useExamResults";

interface ResultsViewerProps {
  userRole: 'teacher' | 'student';
  currentUser?: any;
}

const ResultsViewer = ({ userRole, currentUser }: ResultsViewerProps) => {
  const { results } = useExamResults(userRole, currentUser);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          {userRole === 'teacher' ? 'Student Results' : 'My Results'}
        </CardTitle>
        <CardDescription>
          {userRole === 'teacher' 
            ? 'View exam results from your students' 
            : 'Your completed exam results'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Results Available</h3>
            <p className="text-muted-foreground">
              {userRole === 'teacher' 
                ? 'Student results will appear here once exams are taken.' 
                : 'Your exam results will appear here after completion.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{result.examTitle}</h4>
                      <p className="text-sm text-muted-foreground">
                        {userRole === 'teacher' 
                          ? `Student: ${result.studentName} (@${result.studentUsername})` 
                          : `Completed: ${new Date(result.completedAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}>
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