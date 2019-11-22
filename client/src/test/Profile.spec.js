import React from "react";
import { shallow } from "enzyme"; // a testing library for components and DOM access
import Profile from "../pages/Profile";

describe("Testing of Profile component", () => {
    const user = {
        _id: "2123245",
        name: "John Smith",
        email: "john.smith@mail.com",
        lists: [],
        polls: [],
        friends: [],
        avatar: "",
        online: false
    };

    let wrapper;

    beforeEach(() => {
        const mockProps = {
            user
        };
        wrapper = shallow(<Profile {...mockProps} />);
    });

    it("expect to render Profile component", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
