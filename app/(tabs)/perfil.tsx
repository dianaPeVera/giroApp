import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

interface Contact {
  name: string;
  phone: string;
  relationship: string;
}

export default function EmergencyUsers() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    try {
      const storedContacts = storage.getString('emergencyContacts');
      if (storedContacts) setContacts(JSON.parse(storedContacts));
    } catch (error) {
      console.error('Failed to load contacts', error);
    }
  };

  const saveContacts = (updatedContacts: Contact[]) => {
    try {
      storage.set('emergencyContacts', JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Failed to save contacts', error);
    }
  };

  const handleAddContact = () => {
    if (name && phone && relationship) {
      const newContact = { name, phone, relationship };
      const updatedContacts = editingIndex !== null 
        ? contacts.map((contact, index) => (index === editingIndex ? newContact : contact))
        : [...contacts, newContact];

      setContacts(updatedContacts);
      saveContacts(updatedContacts);

      setName('');
      setPhone('');
      setRelationship('');
      setEditingIndex(null);
    } else {
      Alert.alert('Por favor, completa todos los campos.');
    }
  };

  const handleEditContact = (index: number) => {
    const contact = contacts[index];
    setName(contact.name);
    setPhone(contact.phone);
    setRelationship(contact.relationship);
    setEditingIndex(index);
  };

  const handleDeleteContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    saveContacts(updatedContacts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contactos de Emergencia</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Parentesco"
        value={relationship}
        onChangeText={setRelationship}
      />

      <Button title={editingIndex !== null ? "Actualizar Contacto" : "Agregar Contacto"} onPress={handleAddContact} />

      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.contactContainer}>
            <Text style={styles.contactText}>{`${item.name} - ${item.phone} (${item.relationship})`}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEditContact(index)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteContact(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
    fontSize: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
