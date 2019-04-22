import React from 'react';
import ComponentHead from './head';

describe('component snapshot', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<ComponentHead />);
        expect(wrapper).matchSnapshot();
    });
});