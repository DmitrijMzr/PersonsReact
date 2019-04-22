import React from 'react';
import ItemToDo from './itemToDo';

describe('itemToDo.onClickClose', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
        sandbox.resetHistory();
    });

    it('should call removeItem with index', () => {
        const props = {
            key: 1,
            item: {
                index: 2,
                value: 'some value',
                done: false
            },
            index: 3,
            removeItem: (index) => {console.log('removing with ' + index)},
            markTodoDone: () => {},
            editItem: () => {},
            saveItem: () => {}
        };
        const spy = sinon.spy(props, 'removeItem');
        const component = shallow(<ItemToDo {...props} />);
        const instance = component.instance();
        instance.onClickClose();
        assert(spy.called);
        sandbox.assert.calledOnce(spy);
        sandbox.assert.calledWith(spy, props.index)
    });

    it('should call he', () => {
        const object = {hello: function (){}};
        const spy = sinon.spy(object, 'hello');

        object.hello(1);
        object.hello('he');
        assert(spy.withArgs(1).calledOnce);
        assert(spy.withArgs('he').calledOnce);
    });
});

describe('itemToDo.onClickDone', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        //sandbox.restore();
        //sandbox.resetHistory();
    });

    it('should call markTodoDone with index', () => {
        const props = {
            key: 1,
            item: {
                index: 2,
                value: 'some value',
                done: false
            },
            index: 3,
            removeItem: (index) => {console.log('removing with ' + index)},
            markTodoDone: () => {},
            editItem: () => {},
            saveItem: () => {}
        };
        const spy = sinon.spy(props, 'markTodoDone');
        const component = shallow(<ItemToDo {...props} />);
        const instance = component.instance();
        instance.onClickDone();
        //assert(spy.withArgs(sinon.match(props.item.index)).calledOnce);
        sandbox.assert.calledOnce(spy);
        sandbox.assert.calledWith(spy, props.index)
    });

});

describe('itemToDo.saveItem', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
        sandbox.resetHistory();
    });

    it('should call saveItem', () => {
        const props = {
            key: 1,
            item: {
                index: 2,
                value: 'some value',
                done: false
            },
            index: 3,
            removeItem: () => {},
            markTodoDone: () => {},
            editItem: () => {},
            saveItem: () => {}
        };
        const spy = sinon.spy(props, 'saveItem');
        const component = shallow(<ItemToDo {...props} />);
        const instance = component.instance();
        instance.saveItem();
        assert(spy.called);
        assert(instance.state.renameItem, 'some value');
        assert.strictEqual(instance.state.isEdit, false);
        sandbox.assert.calledWith(spy, 3, 'some value');
    });

});

describe('itemToDo.editItem', () => {
    it('should change state accordingly', () => {
        const props = {
            key: 1,
            item: {
                index: 2,
                value: 'some value',
                done: false
            },
            index: 3,
            removeItem: () => {},
            markTodoDone: () => {},
            editItem: () => {},
            saveItem: () => {}
        };
        const component = shallow(<ItemToDo {...props} />);
        const instance = component.instance();
        instance.editItem();
        assert(instance.state.renameItem, 'some value');
        assert.strictEqual(instance.state.isEdit, true);
    });

});

    // it('should call he', () => {
    //     function he(){}
    //
    //     const spy = sinon.spy(he);
    //     he('hello');
    //     sinon.assert.calledOnce(spy);
    //     sinon.assert.calledWith('hello')
    // });
	//
	// it('should call he', () => {
    //     const object = {hello: function (){}};
    //     const spy = sinon.spy(object, 'hello');
    //
    //     object.hello(1);
    //     object.hello('he');
    //     assert(spy.withArgs(1).calledOnce);
    //     assert(spy.withArgs('he').calledOnce);
    // });


