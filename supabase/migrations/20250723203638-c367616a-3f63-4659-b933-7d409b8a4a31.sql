-- ========== STEP 1: Drop old SELECT policy ==========
DROP POLICY IF EXISTS "Teachers can view their own exams" ON public.exams;

-- ========== STEP 2: Allow all authenticated users to view all exams ==========
CREATE POLICY "All users can view all exams"
ON public.exams
FOR SELECT
TO authenticated
USING (true);

-- ========== STEP 3: Require teacher_username for teachers ==========
ALTER TABLE public.profiles
ADD CONSTRAINT teacher_username_required_for_teachers
CHECK (
  role != 'teacher' OR (teacher_username IS NOT NULL AND teacher_username != '')
);

-- ========== STEP 4: Add index for fast search by teacher_username ==========
CREATE INDEX IF NOT EXISTS idx_exams_teacher_username
ON public.exams(teacher_username);