import React from "react";

export class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activatedEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deActivatedEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
        this.props.updateUserStatus(this.state.status)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (

            <div>
                {!this.state.editMode &&
                <div><span onDoubleClick={this.activatedEditMode}><strong>{this.props.status}</strong> </span></div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange}
                           autoFocus={true} onBlur={this.deActivatedEditMode}
                           type="text"
                           value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}