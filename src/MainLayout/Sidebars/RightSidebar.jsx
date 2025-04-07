import { FiMessageSquare } from "react-icons/fi";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block ">
      <div className="space-y-4">
        {/* The Discuss Blog Section */}
        <div className="border border-gray-300 rounded-xl shadow-md p-5">
          <h3 className="text-lg font-semibold  ">The Discuss Blog</h3>
          <ul className="mt-2 space-y-2 ">
            <li className="hover:text-blue-500 cursor-pointer">
              A look under the hood: How (and why) we built Question Assistant
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              Junky data is like an out-of-tune guitar—it prevents AI harmony
            </li>
          </ul>
        </div>

        {/* Featured on Meta Section */}
        <div className="border border-gray-300 rounded-xl shadow-md p-5">
          <h3 className="text-lg font-semibold ">Featured on Meta</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
              <FiMessageSquare /> How might Chat evolve? Help us identify
              problems and opportunities
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
              <FiMessageSquare /> Community Asks Sprint Announcement - March
              2025
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
              <FiMessageSquare /> Policy: Generative AI (e.g., ChatGPT) is
              banned
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
              <FiMessageSquare /> Is it better to redirect users who attempt to
              perform actions they can't yet...
            </li>
          </ul>
        </div>

        {/* Hot Meta Posts Section */}
        <div className="border-gray-300  rounded-xl shadow-md p-5">
          <h3 className="text-lg font-semibold  ">Hot Meta Posts</h3>
          <p className="mt-2  dark:text-gray-300 hover:text-blue-500 cursor-pointer flex items-center gap-2">
            <FiMessageSquare /> Just how perfect does a question have to be to
            leave SG?
          </p>
        </div>

        {/* Recently Viewed Posts Section */}
        <div className="border border-gray-300  rounded-xl shadow-md p-5">
          <h3 className="text-lg font-semibold  ">Recently Viewed Posts</h3>
          <ul className="mt-2 space-y-4 ">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="border-b pb-3 last:border-none">
                <p className="hover:text-blue-500 cursor-pointer">
                  Why does TypeScript infer an intersection type (&) instead of
                  a union (|)?
                </p>
                <div className="flex justify-between text-sm mt-1">
                  <div className="flex gap-2">
                    <p>2 Votes</p>
                    <p>1 Answer</p>
                  </div>
                  <p className="text-blue-500 hover:underline cursor-pointer">
                    + Follow
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
