import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedQuestions } from "../../redux/saveSlice";
import AuthContext from "../../Context/AuthContext";

const Saves = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { saveData, loading, error } = useSelector((state) => state.saves);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchSavedQuestions(user.email));
    }
  }, [dispatch, user?.email]);

  return (
    <div>
      <h3 className="text-2xl font-bold pb-4"> All bookmarks</h3>
      {loading && <p>Loading bookmarks...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {saveData?.length > 0 ? (
        saveData.map((question) => (
          <div key={question._id}>
            <div className="border p-4 rounded shadow">
              <h2 className="text-base font-semibold text-blue-600">{question.title}</h2>
              <p className="mt-2 text-gray-700 dark:bg-slate-900 dark:text-white">
                {question.body}
              </p>
              <div className="flex items-center justify-between">
                <div className="mt-4 text-sm text-gray-500">
                  <span>Tag: {question.tag}</span> | <span>{question.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : !loading ? (
        <p>No bookmark question available.</p>
      ) : null}
    </div>
  );
};

export default Saves;