import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function ShCartScreen({ route, navigation }) {
    //const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('cart');

    useEffect(() => {
        if (route?.params?.showWishlist) {
            setActiveTab('wishlist');
        }
    }, [route]);

    const promo = {
        id: 1,
        titulo: 'Promo Gamer',
        imagen: require('../../assets/promos/promo1.jpg'),
        precio: 1299.99,
        color: 'Negro',
        cantidad: 1
    };

    const wishlist = [
        {
            id: 2,
            titulo: 'Playera Stranger Things',
            imagen: require('../../assets/promos/promo2.jpg'),
            precio: 548.00,
        },
        {
            id: 3,
            titulo: 'Polo rayas manga larga',
            imagen: require('../../assets/promos/promo3.jpg'),
            precio: 649.00,
        },
        {
            id: 4,
            titulo: 'Sudadera Street Style',
            imagen: require('../../assets/promos/promo4.jpg'),
            precio: 799.00,
        },
    ];

    const handleFinalizarCompra = () => {
        Alert.alert(
            "✅ ¡Compra finalizada!",
            "Gracias por tu pedido, En breve recibirás un correo con los detalles.",
            [{ text: "Aceptar", onPress: () => navigation.navigate('Home') }]
        );
    };

    const handleSeguirComprando = () => {
        navigation.navigate('Classification');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setActiveTab('cart')}>
                    <Text style={[styles.headerTitle, activeTab === 'cart' && styles.activeTab]}>
                        CESTA (1)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setActiveTab('wishlist')}>
                    <Text style={[styles.headerSubTitle, activeTab === 'wishlist' && styles.activeTab]}>
                        WISHLIST (3)
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                {activeTab === 'cart' && (
                    <View style={styles.notice}>
                        <Ionicons name="alert-circle-outline" size={20} color="#000" />
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <Text style={styles.noticeTitle}>Click & Collect · Entrega en 4 horas</Text>
                            <Text style={styles.noticeText}>¡Recoge tu pedido en tiempo récord!</Text>
                        </View>
                    </View>
                )}
                {activeTab === 'cart' && (
                    <View style={styles.productCard}>
                        <Image source={promo.imagen} style={styles.image} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productTitle}>{promo.titulo}</Text>
                            <Text style={styles.price}>${promo.precio.toFixed(2)} MXN</Text>
                            <Text style={styles.detailsText}>
                                {promo.cantidad} ud. · {promo.color}
                            </Text>
                        </View>
                    </View>
                )}
                {activeTab === 'wishlist' && (
                    <View style={styles.wishlistContainer}>
                        {wishlist.map((item) => (
                            <View key={item.id} style={styles.productCard}>
                                <Image source={item.imagen} style={styles.image} />
                                <View style={styles.productDetails}>
                                    <Text style={styles.productTitle}>{item.titulo}</Text>
                                    <Text style={styles.price}>${item.precio.toFixed(2)} MXN</Text>
                                </View>
                                <TouchableOpacity style={styles.heartButton}>
                                    <Ionicons name="heart" size={22} color="#E0245E" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
                {activeTab === 'cart' ? (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.btn, styles.buyButton]} onPress={handleFinalizarCompra}>
                            <Ionicons name="checkmark-circle-outline" size={22} color="white" />
                            <Text style={styles.btnText}>Finalizar compra</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.continueButton]} onPress={handleSeguirComprando}>
                            <Ionicons name="arrow-forward-circle-outline" size={22} color="white" />
                            <Text style={styles.btnText}>Seguir viendo productos</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.btn, styles.continueButton]} onPress={handleSeguirComprando}>
                            <Ionicons name="arrow-back-circle-outline" size={22} color="white" />
                            <Text style={styles.btnText}>Regresar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 50,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#e2e8f0',
    },
    headerTitle: {
        fontWeight: '700',
        fontSize: 16,
        color: '#000',
    },
    headerSubTitle: {
        fontWeight: '400',
        fontSize: 16,
        color: '#94a3b8',
    },
    activeTab: {
        color: '#32A7AC',
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff8d3',
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        width: width * 0.9,
        elevation: 2,
    },
    noticeTitle: {
        fontWeight: '700',
        color: '#000',
        fontSize: 14,
    },
    noticeText: {
        fontSize: 12,
        color: '#000',
    },
    productCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 15,
        marginTop: 20,
        padding: 10,
        width: width * 0.9,
        shadowColor: '#9BC9E7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },
    productDetails: {
        marginLeft: 15,
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#32A7AC',
        marginVertical: 5,
    },
    detailsText: {
        fontSize: 13,
        color: '#64748b',
    },
    heartButton: {
        padding: 6,
    },
    buttonContainer: {
        width: '90%',
        marginTop: 40,
        marginBottom: 30,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
    },
    buyButton: {
        backgroundColor: '#32A7AC',
    },
    continueButton: {
        backgroundColor: '#8DCF3F',
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
        marginLeft: 8,
    },
});
