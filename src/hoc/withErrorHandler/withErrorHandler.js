import React, {Component} from 'react';
import Wrap from '../Wrap/Wrap';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error: null
        }
        componentWillMount(){
            this.reqIntercepter = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resIntercepter = axios.interceptors.response.use(res => res, error=>{
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIntercepter);
            axios.interceptors.response.eject(this.resIntercepter);
        }

        errorConfirmedHandler=()=>{
            this.setState({error: null})
        }
        render(){
            return(
                <Wrap>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message + ', TRY AGAIN!' : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Wrap>
            );
        }
    }
}

export default errorHandler;