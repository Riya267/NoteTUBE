import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchSummary } from '../customHooks/useFetchSummary';
import { ActivityIndicator } from '../utils/helper';
import FormWrapper from '../components/formWrapper';
import NotesWrapper from '../components/summaryWrapper';
import CardGrid from '../components/WhyCardGrid';
import HowItWorks from '../components/howItWorks';
import QuickPrompts from '../components/quickPrompts';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
  const { summary, isLoading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (summary && !isLoading) navigate('/generate');
  }, [isLoading, summary]);

  return (
    <div className="relative flex flex-col">
      {isLoading && !summary && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
          <ActivityIndicator />
        </div>
      )}
      <FormWrapper />
      <CardGrid />
      <HowItWorks />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
