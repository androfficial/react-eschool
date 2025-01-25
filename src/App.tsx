import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { NotFoundPage } from '@/components/NotFoundPage';
import { StudentDetails } from '@/components/StudentDetails';
import { StudentsTable } from '@/components/StudentsTable';
import { ToastProvider } from '@/configs/toastConfig';
import { CenteredLayout } from '@/layouts/CenteredLayout';

export const App: React.FC = () => {
  return (
    <>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route>
              <Route path="/" element={<StudentsTable />} />
              <Route element={<CenteredLayout />}>
                <Route path="student/:id" element={<StudentDetails />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
      <ToastProvider />
    </>
  );
};
