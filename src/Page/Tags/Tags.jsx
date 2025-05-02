import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTags } from "../../redux/tagsSlice";
import {
  fetchQuestionsByTag,
  clearTaggedQuestions,
} from "../../redux/questionsSlice";
import { Link } from "react-router-dom";
import { Tag } from "lucide-react";
import LoadingPage from "../Loading/LoadingPage";

const Tags = () => {
  const dispatch = useDispatch();
  const { tags, loading: tagsLoading } = useSelector((state) => state.tags);
  const { taggedQuestions, taggedLoading } = useSelector((state) => state.questions);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    if (selectedTag) {
      dispatch(fetchQuestionsByTag(selectedTag));
    } else {
      dispatch(clearTaggedQuestions());
    }
  }, [dispatch, selectedTag]);

  const filteredTags = tags.filter((tag) =>
    tag.tag.toLowerCase().includes(search.toLowerCase())
  );

  if (tagsLoading) return <LoadingPage />;

  return (
    <section className="w-full min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text flex items-center justify-center gap-2">
            <Tag className="w-8 h-8 text-pink-500" /> Explore Popular Tags
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            Discover topics loved by the DevDiscuss community!
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search for tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredTags.length > 0 ? (
            filteredTags.map((tagData, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTag(tagData.tag)}
                className={`p-4 rounded-xl cursor-pointer shadow-md border-l-4 transition-all duration-300 hover:scale-105 ${
                  selectedTag === tagData.tag ? 
                  "border-indigo-500 bg-transparent" :
                  "border-pink-500 bg-transparent"
                }`}
              >
                <h3 className="text-md font-semibold text-purple-300 truncate">
                  {tagData.tag}
                </h3>
                <p className="text-sm text-gray-400">{tagData.count} questions</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No tags found.
            </p>
          )}
        </div>

        {/* Clear Filter Button */}
        {selectedTag && (
          <div className="text-right">
            <button
              onClick={() => setSelectedTag(null)}
              className="text-sm text-pink-400 hover:underline"
            >
              ✖ Clear Filter
            </button>
          </div>
        )}

        {/* Tagged Questions */}
        {selectedTag && (
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r  from-purple-400 to-pink-600 text-transparent bg-clip-text mb-4">
              Questions tagged with {selectedTag}
            </h3>

            {taggedLoading ? (
              <LoadingPage />
            ) : (
              <div className="space-y-4">
                {taggedQuestions.length > 0 ? (
                  taggedQuestions.map((question) => (
                    <div
                      key={question._id}
                      className="p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <Link to={`/questions/${question._id}`}>
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text hover:underline mb-1">
                          {question.title}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-300 line-clamp-2">{question.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No questions found for this tag.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tags;