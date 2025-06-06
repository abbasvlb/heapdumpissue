import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal,
  FlatList,
  Button,
} from 'react-native';

let memoryLeakArray = [];
export function allocateMemory(megabytes) {
  const bytes = megabytes * 1024 * 1024;
  // Each number in JS is 8 bytes, so calculate how many numbers to allocate
  const numElements = Math.floor(bytes / 8);
  const arr = new Array(numElements).fill(Math.random());
  memoryLeakArray.push(arr);
}

const TeamAllocator = ({ navigation }) => {
  const initialPlayers = [
    "Abu Veg", "Abu Auto", "Abbas", "Anzil", "Arif", 
    "Afzal", "Appu", "Dharves", "Durves", "Riyas Oppo",
    "Riyas Ahamed", "Riyas Kelangu", "Chinnu", "Faiz", "Sameer",
    "Ibrahim", "Nisar", "Safi", "sajith", "Sivaraman",
    "Toufiq", "Venkat","Anas","Guest 1","Guest 2"
  ];

  const [availablePlayers, setAvailablePlayers] = useState(initialPlayers);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const movePlayer = (player, fromTeam, toTeam) => {
    let sourceTeam;
    let setSourceTeam;
    
    switch (fromTeam) {
      case 'available':
        sourceTeam = availablePlayers;
        setSourceTeam = setAvailablePlayers;
        break;
      case 'A':
        sourceTeam = teamA;
        setSourceTeam = setTeamA;
        break;
      case 'B':
        sourceTeam = teamB;
        setSourceTeam = setTeamB;
        break;
    }

    setSourceTeam(sourceTeam.filter(p => p !== player));

    switch (toTeam) {
      case 'available':
        setAvailablePlayers([...availablePlayers, player]);
        break;
      case 'A':
        setTeamA([...teamA, player]);
        break;
      case 'B':
        setTeamB([...teamB, player]);
        break;
    }
  };

  const addPlayer = () => {
    throw new Error('My first Sentry error!');
    if (newPlayer.trim() !== '') {
      setAvailablePlayers([...availablePlayers, newPlayer.trim()]);
      setNewPlayer('');
      setModalVisible(false);
    }
  };

 

  return (
    <SafeAreaView style={styles.container}> 
      {/* <TouchableOpacity style={{margin: 16, padding: 12, backgroundColor: '#007bff', borderRadius: 8}} onPress={() => navigation.navigate('DummyScreen')}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Go to Dummy Screen</Text>
      </TouchableOpacity> */}
      
      <ScrollView style={styles.playersList}>
        <View style={[styles.teamsRow]}>
          <View style={styles.teamHalf}>
           
          </View>
          <View style={styles.teamHalf}>
          
          </View>
        </View>
        <View style={styles.availableRow}>
         
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Player</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter player name"
              value={newPlayer}
              onChangeText={setNewPlayer}
            />
            <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
              <Text style={styles.addButtonText}>Add Player</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Button
        title="Allocate 20MB"
        onPress={() => allocateMemory(20)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 6,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  teamsRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  teamHalf: {
    flex: 1,
    marginHorizontal: 3,
  },
  availableRow: {
    flex: 1,
    marginHorizontal: 3,
  },
  teamContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 6,
  },
  teamTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  teamTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addPlayerButton: {
    fontSize: 24,
    color: '#4CAF50',
  },
  playersList: {
    flex: 1,
  },
  playerCard: {
    backgroundColor: '#f8f9fa',
    padding: 6,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    margin: 3,
  },
  playerName: {
    fontSize: 13,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    minWidth: 28,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  teamAButton: {
    backgroundColor: '#4CAF50',
  },
  teamBButton: {
    backgroundColor: '#2196F3',
  },
  availableButton: {
    backgroundColor: '#f44336',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default TeamAllocator;