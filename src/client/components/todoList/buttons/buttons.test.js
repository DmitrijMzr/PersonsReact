import React from 'react';
import Buttons from './buttons';

describe ('Buttons component', () => {
    it('should render correctly', () => {
        const props = {
            isEdit: false,
            editCallback: () => {},
            saveCallback: () => {},
            closeCallback: () => {}
        };
        const wrapper = shallow(<Buttons {...props} />);
        expect(wrapper).matchSnapshot();
    });


});
