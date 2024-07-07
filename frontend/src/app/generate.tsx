import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchSummary } from '../customHooks/useFetchSummary';
import { ActivityIndicator } from '../utils/helper';
import FormWrapper from '../components/formWrapper';
import NotesWrapper from '../components/summaryWrapper';
import CardGrid from '../components/WhyCardGrid';
import HowItWorks from '../components/howItWorks';
import QuickPrompts from '../components/quickPrompts';

export default function Generate() {
  return (
    <div className="relative flex flex-col">
      <NotesWrapper />
      <QuickPrompts />
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
