import React from 'react'
import withApollo from 'lib/with-apollo'
import { testRequest } from 'lib/utils/csrf'

class TestCsrfPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testGet: 'no',
      testPost: 'no'
    }
  }

  async componentDidMount() {
    this.setState({
      testGet: await testRequest('GET'),
      testPost: await testRequest('POST')
    })
  }

  render() {
    return (
      <>
        <p>Test GET request: {this.state.testGet}</p>
        <p>Test POST request: {this.state.testPost}</p>
      </>
    )
  }
}

export default withApollo(TestCsrfPage)
