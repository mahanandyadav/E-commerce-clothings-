
import React, { Component } from 'react'
import { useSelector, connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectCurrentUser } from '../../store/user/user.selector'

const PreventRouterHoc = (OrignalComponent) => {
    // const currentUser = useSelector(selectCurrentUser );
    // console.log(currentUser)

    class newComponent extends Component {
        constructor(props) {
            super(props)
            const currentUser = this.props.currentUser;
            // this.currentUser = this.currentUser.bind(this)//i thing we need to bind currentUser

        }
        
        render() {

            if (this.props.currentUser) {
                return (
                    <OrignalComponent />
                )
            } else {
                return <Navigate to={{pathname : '/auth'}}/>
            }

        }
    }

    const mapStateToProps = state => {
        return {
            currentUser: state.user.currentUser
        }
    }

    return connect(mapStateToProps)(newComponent)
}


export default (PreventRouterHoc);