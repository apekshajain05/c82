import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Card from 'react-native-elements';

export default  class ReceiverDetailScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId:firebase.auth().currentUser.email,
            receiverId:this.props.navigation.getParameter('details')['user_id'],
            requestId:this.props.navigation.getParameter('details')['request_id'],
            bookName:this.props.navigation.getParameter('details')['book_name'],
            reasonToRequest:this.props.navigation.getParameter('details')['reason_to_request'],
            receiverName:'',
            receiverContact:'',
            receiverAddress:'',
            receiverRequestDocId:'',
        }
    }
    getReceiverDetails=()=>{
        db.collection('users').where('email_id','==',this.state.receiverId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    receiverName:doc.data().first_name,
                    receiverContact:doc.data().contact,
                    receiverAddress:doc.data().address,
                })
            })
        })
        db.collection('requested_books').where('request_id','==',this.state.requestId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    receiverRequestDocId:doc.id 
                })
            })
        })
    }
    updateBookStatus=()=>{
        db.collection('all_donations').add({
            book_name:this.state.bookName,
            request_id:this.state.requestId,
            requested_by:this.state.receiverName,
            donor_id:this.state.userId,
            request_status:'donorInterested'
        })
    }
    render(){
        return(
            <View>
                <Card title='Book Information'
                titleStyle={{fontSize=20}} > 
                    <Card>
                        <Text>Name:{this.state.bookName} </Text>
                    </Card>
                    <Card>
                        <Text>Reason to request:{this.state.reasonToRequest} </Text>
                    </Card>
                   
                </Card>
                <View>
                    <Card title='Receiver Details'
                    titleStyle={{fontSize=20}}>
                         <Card>
        <Text>Receiver Name: {this.state.receiverName}</Text>
                        </Card>
                        <Card>
        <Text>Receiver Contact No: {this.state.receiverContact}</Text>
                        </Card>
                        <Card>
        <Text>Receiver Address: {this.state.receiverAddress}</Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    {this.state.receiverId!==this.state.userId}?(
                        <TouchableOpacity onPress={()=>{
                            this.updateBookStatus
                            this.props.navigation.navigation('MyDonations')
                        }}>
                            <Text>I want to donate</Text>
                        </TouchableOpacity>
                    ):null
                </View>
            </View>
        )
    }
}