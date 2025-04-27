import React from "react";
import { useParams } from "react-router-dom";
import ManageBlog from "./ManageBlog";

import ManageUser from "./ManageUser";
import ManageQuestion from "./ManageQuestion";
import TrackPayment from "./TrackPayment";
import AddEvent from "./AddEvent";

const SettingsOption = () => {
    const { id } = useParams();
    
   
    const renderComponent = () => {
        switch (id) {
            case "1":
                return <ManageBlog />;
            case "2":
                return <ManageQuestion />;
            case "3":
                return <AddEvent />;
            case "4":
                return <ManageUser />;
            case "5":
                return <TrackPayment />;
            default:
                return (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-xl text-gray-500">
                            Please select a settings option to continue
                        </p>
                    </div>
                );
        }
    };

    return (
        <div>
            {renderComponent()}
        </div>
    );
};

export default SettingsOption;