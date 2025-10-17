import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
    const [userName, setUserName] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const loadUser = async () => {
            const name = await AsyncStorage.getItem("userName");
            if (name) setUserName(name);
        };
        loadUser();
    }, []);

    const handleLogout = async () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Mi cuenta</Text>
                    <Text style={styles.headerEmail}>{userName.toLowerCase()}@gmail.com</Text>
                </View>
                <View style={styles.headerIcons}>
                    <Ionicons name="globe-outline" size={22} color="#000" style={{ marginRight: 10 }} />
                    <Ionicons name="share-outline" size={22} color="#000" />
                </View>
            </View>
            <View style={styles.idCard}>
                <View style={styles.idInfo}>
                    <Text style={styles.idTitle}>nimOS ID</Text>
                    <Text style={styles.idText}>
                        Usalo para agilizar tus pedidos, devoluciones y disfrutar de beneficios exclusivos.
                    </Text>
                    <TouchableOpacity style={styles.addIdButton}>
                        <Text style={styles.addIdText}>Añadir ID</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.qrMock}>
                    <Ionicons name="qr-code-outline" size={70} color="#1e293b" />
                </View>
            </View>
            <View style={styles.optionsGrid}>
                <View style={styles.optionBox}>
                    <Ionicons name="bag-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Mis compras</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="return-down-back-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Devoluciones</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="location-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Direcciones</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="person-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Datos personales</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="notifications-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Notificaciones</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="mail-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Newsletter</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="document-text-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Privacidad</Text>
                </View>
                <View style={styles.optionBox}>
                    <Ionicons name="help-circle-outline" size={26} color="#1e293b" />
                    <Text style={styles.optionText}>Atención al cliente</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={22} color="#fff" />
                <Text style={styles.logoutText}>Volver</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
    },
    headerEmail: {
        fontSize: 13,
        color: "#475569",
    },
    idCard: {
        flexDirection: "row",
        backgroundColor: "#B7D1B0",
        marginHorizontal: 15,
        borderRadius: 15,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
    },
    idInfo: {
        flex: 1,
        paddingRight: 10,
    },
    idTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1e293b",
        marginBottom: 6,
    },
    idText: {
        fontSize: 13,
        color: "#1e293b",
        marginBottom: 10,
    },
    addIdButton: {
        backgroundColor: "#000",
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 25,
        alignSelf: "flex-start",
    },
    addIdText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
    qrMock: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    optionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 25,
    },
    optionBox: {
        width: width / 2.3,
        height: 100,
        backgroundColor: "#f8f9fa",
        margin: 8,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    optionText: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: "500",
        color: "#1e293b",
        textAlign: "center",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#32A7AC",
        paddingVertical: 14,
        marginHorizontal: 40,
        borderRadius: 12,
        marginTop: 40,
        marginBottom: 60,
        elevation: 4,
    },
    logoutText: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 8,
        fontSize: 15,
    },
});
