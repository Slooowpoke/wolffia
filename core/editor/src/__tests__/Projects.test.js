import * as actions from '../components/projects/actions'

describe('Project Tests', () => {
	it('Create a new project and add it to the state',
	() => {
		const name = 'Project A';
		const expectedAction = {
			type: actions.ADD_PROJECT,
			name,
			index: 0
		}
		expect(actions.addProject(name)).toEqual(expectedAction);
	});

    it('Create a new project and add it to the state',
    () => {
        const index = 0;
        const expectedAction = {
            type: actions.DELETE_PROJECT,
            index: 0
        }
        expect(actions.removeProject(index)).toEqual(expectedAction);
    });
})
