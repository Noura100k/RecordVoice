import React, { useState } from 'react';
import MicrophoneComponent from './MicrophoneComponent';
import { StyleSheet, View, ScrollView, Button, Text, TextInput} from "react-native";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function Record() {
  const [recording, setRecording] = React.useState();
  const [uritext, seturitext] = useState("");
  const [uriFile, seturiFile] = useState("");
  const [text,settext]=useState();
  const [state, setState] = useState(false);
  const [loading, setLoading] = useState(false);

  let input = '';
  const saveUserInput = userInput => {
    input = userInput;
  };
const Done = async () => {
    // start loading
    setLoading(true);
    // upload image to server
    await uploadVoiceAsync(uriFile)
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
    // stop loading
    setLoading(false);
  };

  const uploadVoiceAsync = async (uriFile) => {
    /**
     * how to get your laptop IP:
     * 1. open cmd
     * 2. type "ipconfig"
     * 3. find "IPv4 Address" and copy it
     * 4. paste it in the url above
     * 5. replace "<YourLaptopIP>"" with your IP
     * example: http://192.168.100.5:19006/classify
     */
    let apiUrl = "http://***/upload-audio/";
    const formData = new FormData();
    const base64 = await FileSystem.readAsStringAsync(uriFile, { encoding: 'base64' });
    console.log(input)
    formData.append('audio',base64);
    formData.append('text',input);
    

    
    console.log(base64)


    let options = {
      method: "POST",
      body: formData,
      headers: {
        
        "Content-Type": "multipart/form-data",
      },
    };
    return fetch(apiUrl, options);
  };





  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri_file = recording.getURI();
    seturiFile(uri_file)
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    const uri = sound
    console.log('Recording stopped and stored at', uri);
    seturitext(uri)
    setState(true)
  }

  
  function getPlay() {
    if(state){
    return(
        <View style={styles.row}>

         <Button  onPress={() => uritext.replayAsync()} title="Play"></Button>
         <TextInput style={styles.input} placeholder={'اكتب الحرف'}  onChangeText={userInput => saveUserInput(userInput)}/>
         <Button  title="Done" onPress={() => Done()}></Button>
         </View>
    
    );

    }
    return(<Text>Nothing Recorded</Text>);
  }

  return (


<View style={styles.container}>
<Text style={styles.title}> سجل الحروف </Text>
<MicrophoneComponent
  name={recording ? 'stop-circle' : 'mic'}
  color={recording ? '#FA8072' : '#FFCA32'}
  onPress={recording ? stopRecording : startRecording} />
<ScrollView style={styles.container_voice}>


{getPlay()}
</ScrollView>

</View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
    },
     title:{
        fontSize:30,
        color:'#808080',
        marginBottom:20,
        marginTop:30,
      },
      bottom:{
        marginTop: 150,
        flexDirection: "row",
      },
      container_voice: {
        width: '100%',
        height: '50%',
        backgroundColor: '#fff',
        borderColor:'#e8e8e8',
        borderWidth:2,
        borderRadius:20,
        marginVertical: 30,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:10,
    
      },
      fill: {
        paddingLeft: 60,
        margin: 16
      },
      button: {
        margin: 16
      },
      input:{
        backgroundColor: 'white',
        width:'25%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        padding:5,
        textAlign: 'center',
    }
  
  });
  
