import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const [nombre, setNombre] = useState("");
    const [pass, setPass] = useState("");
    const navigation = useNavigation();

    async function conectUsers() {
        const response = await fetch('http://192.168.1.13:3000/users');
        const data = await response.json();
        return data;
    }

    const validarAcceso = async () => {
        if (nombre === "" || pass === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const users = await conectUsers();
        const usuario = users.find(u => {
            return u.nombre === nombre && u.pass === pass;
        });

        if (usuario) {
            console.log('Acceso concedido: ' + usuario.nombre);
            AsyncStorage.setItem('userName', usuario.nombre);
            navigation.navigate('Home');
        } else {
            const usuarioExiste = users.find(u => u.nombre === nombre);
            if (usuarioExiste) {
                alert('Contraseña incorrecta');
            } else {
                alert('Usuario incorrecto');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>nimOS</Text>
                <Text style={styles.subtitle}>Iniciar Sesion</Text>
            </View>

            <View style={styles.formCard}>
                <View style={styles.inputGroup}>
                    <View style={styles.inputContainer}>
                        <Image
                            source={require('../../assets/user_logo.png')}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            onChangeText={(txt) => setNombre(txt)}
                            value={nombre}
                            placeholder="Ingresa usuario"
                            placeholderTextColor="#9BC9E7"
                            style={styles.textInput}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Image
                            source={require('../../assets/password_logo.png')}
                            style={styles.inputIcon}
                        />
                        <TextInput
                            onChangeText={(txt) => setPass(txt)}
                            value={pass}
                            placeholder="Ingresa contraseña"
                            placeholderTextColor="#9BC9E7"
                            secureTextEntry={true}
                            style={styles.textInput}
                            scrollEnabled={false}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={validarAcceso}>
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        width: '100%',
    },
    appName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#32A7AC',
        marginBottom: 6,
        letterSpacing: 2,
        textShadowColor: '#9BC9E7',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 20,
        color: '#5AB8AE',
        fontWeight: '600',
        letterSpacing: 0.5,
        marginTop: 10,
    },
    formCard: {
        width: '100%',
        backgroundColor: '#f8f9fa',
        padding: 30,
        borderRadius: 20,
        shadowColor: '#32A7AC',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#9BC9E7',
    },
    inputGroup: {
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#9AC9E7',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 20,
        shadowColor: '#9BC9E7',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    inputIcon: {
        width: 22,
        height: 22,
        marginRight: 12,
        tintColor: '#32A7AC',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#8DCF3F',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#8ECC38',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#8ECC38',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});