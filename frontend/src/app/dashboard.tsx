import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchNotes } from '../customHooks/useFetchNotes';
import { ActivityIndicator } from '../components/activityIndicator';
import FormWrapper from '../components/formWrapper';
import NotesWrapper from '../components/notesWrapper';

export default function Dashboard() {
  const { data, error, isLoading, invokeNotesApi } = useFetchNotes();
  return (
    <div className="h-full relative text-slate-500 text-center flex flex-col justify-center items-center w-full">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50">
          <ActivityIndicator />
        </div>
      )}
      {!data ? (
        <FormWrapper error={error} invokeNotesApi={invokeNotesApi} />
      ) : (
        <NotesWrapper notes={data.notes} videoId={data.videoId} />
      )}
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
