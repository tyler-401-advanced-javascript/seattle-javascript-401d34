import React from 'react'
import Thing from './'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'

describe('<Thing />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Thing />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('changes state on click', () => {
    const component = mount(<Thing />)
    const button = component.find('#myButton')
    button.simulate('click')
    expect(component).toHaveState({ stuff: false })
    expect(component.find('span')).toIncludeText('false')
  })
})
