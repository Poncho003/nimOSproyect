import { StatusBar } from 'expo-status-bar';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Animated, ScrollView, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
//import { ListItem, Button } from '@rneui/themed';


const { width } = Dimensions.get('window');

const theme = {
    primary: '#32A7AC',    
    aquaSoft: '#5AB8AE',  
    blueSoft: '#9BC9E7',   
    blueLight: '#9AC9E7',  
    greenBright: '#8DCF3F',
    greenLime: '#8ECC38', 
    textDark: '#1F2937',
    textMuted: '#6B7280',
    border: '#E5E7EB',
    white: '#FFFFFF',
};

export default function HomeScreen() {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(true);
    const [promos, setPromos] = useState([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    async function getPromos() {
        try {
            const response = await fetch('http://192.168.1.13:3000/promos');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al cargar promociones:", error);
            return [];
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userName = await AsyncStorage.getItem('userName');
                if (userName) setNombre(userName);

                const promosData = await getPromos();
                setPromos(promosData);

                Animated.parallel([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(slideAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    })
                ]).start();
            } catch (error) {
                console.error('Error getting data:', error);
            } finally {
                setLoading(false);
            }
        };
        getUserData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingIcon}>
                        <Ionicons name="shirt" size={50} color={theme.blueSoft} />
                    </View>
                    <Text style={styles.loadingText}>Cargando estilo...</Text>
                </View>
            </View>
        );
    }

    const getImage = (name) => {
        switch (name) {
            case 'promo1.jpg':
                return require('../../assets/promos/promo1.jpg');
            case 'promo2.jpg':
                return require('../../assets/promos/promo2.jpg');
            case 'promo3.jpg':
                return require('../../assets/promos/promo3.jpg');
            default:
                return require('../../assets/promos/promo1.jpg');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarBackground}>
                            <Ionicons name="person" size={28} color={theme.white} />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.welcomeText}>
                                Hola, <Text style={styles.userName}>{nombre}</Text>
                            </Text>
                            <Text style={styles.subtitle}>Descubre las ultimas tendencias</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.notificationIcon}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <Ionicons name="notifications-outline" size={24} color={theme.textMuted} />
                        <View style={styles.notificationBadge} />
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.ScrollView
                nestedScrollEnabled
                style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.swiperContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Coleccion Destacada</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Ver todo</Text>
                        </TouchableOpacity>
                    </View>

                    <SwiperFlatList
                        autoplay
                        autoplayDelay={4}
                        autoplayLoop
                        showPagination
                        paginationStyle={styles.paginationContainer}
                        paginationStyleItem={styles.paginationItem}
                        paginationStyleItemActive={styles.paginationItemActive}
                        paginationStyleItemInactive={styles.paginationItemInactive}
                    >
                        {promos.map((item) => (
                            <View key={item.id} style={styles.slide}>
                                <View style={styles.imageContainer}>
                                    <Image source={getImage(item.imagen)} style={styles.image} />
                                    <View style={styles.promoBadge}>
                                        <Text style={styles.promoBadgeText}>NUEVA TEMPORADA</Text>
                                    </View>
                                    <View style={styles.overlay} />
                                    <View style={styles.promoContent}>
                                        <Text style={styles.promoTitle}>{item.titulo}</Text>
                                        <Text style={styles.promoSubtitle}>Hasta 50% de descuento</Text>
                                        <TouchableOpacity style={styles.shopNowButton}>
                                            <Text style={styles.shopNowText}>Comprar ahora</Text>
                                            <Ionicons name="arrow-forward" size={16} color={theme.white} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </SwiperFlatList>
                </View>
                <View style={styles.actionsContainer}>
                    <Text style={styles.actionsTitle}>Explorar</Text>
                    <View style={styles.actionsGrid}>
                        <TouchableOpacity
                            style={[styles.actionCard, { borderTopColor: theme.primary }]}
                            onPress={() => navigation.navigate('Classification')}
                        >
                            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(50,167,172,0.12)' }]}>
                                <Ionicons name="grid" size={28} color={theme.primary} />
                            </View>
                            <Text style={styles.actionTitle}>Categorías</Text>
                            <Text style={styles.actionSubtitle}>Ver todas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionCard, { borderTopColor: theme.blueSoft }]}
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(155,201,231,0.18)' }]}>
                                <Ionicons name="bag-handle" size={28} color={theme.blueSoft} />
                            </View>
                            <Text style={styles.actionTitle}>Mi Carrito</Text>
                            <Text style={styles.actionSubtitle}>1 item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionCard, { borderTopColor: theme.aquaSoft }]}
                            onPress={() => navigation.navigate('Cart', { showWishlist: true })}
                        >
                            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(90,184,174,0.14)' }]}>
                                <Ionicons name="heart" size={28} color={theme.aquaSoft} />
                            </View>
                            <Text style={styles.actionTitle}>Favoritos</Text>
                            <Text style={styles.actionSubtitle}>3 items</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionCard, { borderTopColor: theme.greenLime }]}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(142,204,56,0.14)' }]}>
                                <Ionicons name="person" size={28} color={theme.greenLime} />
                            </View>
                            <Text style={styles.actionTitle}>Perfil</Text>
                            <Text style={styles.actionSubtitle}>Configurar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.categoriesContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categorias Populares</Text>
                        
                    </View>

                    <View style={styles.categoriesGrid}>
                        <TouchableOpacity 
                        style={styles.categoryItem}
                        onPress={() => navigation.navigate('Woman')}>
                            <View style={[styles.categoryIcon, { backgroundColor: 'rgba(155,201,231,0.25)' }]}>
                                <Ionicons name="woman" size={24} color={theme.primary} />
                            </View>
                            <Text style={styles.categoryText}>Mujer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={styles.categoryItem}
                        onPress={() => navigation.navigate('Man')}>
                            <View style={[styles.categoryIcon, { backgroundColor: 'rgba(154,201,231,0.25)' }]}>
                                <Ionicons name="man" size={24} color={theme.primary} />
                            </View>
                            <Text style={styles.categoryText}>Hombre</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryItem}>
                            <View style={[styles.categoryIcon, { backgroundColor: 'rgba(90,184,174,0.22)' }]}>
                                <Ionicons name="footsteps" size={24} color={theme.aquaSoft} />
                            </View>
                            <Text style={styles.categoryText}>Zapatos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryItem}>
                            <View style={[styles.categoryIcon, { backgroundColor: 'rgba(141,207,63,0.22)' }]}>
                                <Ionicons name="watch" size={24} color={theme.greenBright} />
                            </View>
                            <Text style={styles.categoryText}>Accesorios</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>

            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.white,
        paddingTop: Platform.OS === 'android' ? 0 : 0,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    loadingContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.white,
    },
    loadingIcon: {
        padding: 20,
        backgroundColor: 'rgba(155,201,231,0.2)', 
        borderRadius: 50,
        marginBottom: 20,
    },
    loadingText: {
        color: theme.textMuted, fontSize: 16, fontWeight: '500',
    },
    header: {
        backgroundColor: theme.white,
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    headerContent: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    avatarContainer: {
        flexDirection: 'row', alignItems: 'center', flex: 1,
    },
    avatarBackground: {
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: theme.primary,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12,
    },
    headerText: { flex: 1 },
    welcomeText: { fontSize: 18, color: '#374151', fontWeight: '400' },
    userName: { fontWeight: '700', color: theme.textDark },
    subtitle: { fontSize: 14, color: theme.textMuted, marginTop: 2 },
    notificationIcon: { padding: 8, position: 'relative' },
    notificationBadge: {
        position: 'absolute', top: 6, right: 6,
        width: 8, height: 8, borderRadius: 4, backgroundColor: theme.greenLime,
    },

    sectionHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
    },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: theme.textDark },
    seeAllText: { fontSize: 14, color: theme.primary, fontWeight: '600' },

    swiperContainer: { height: 320, marginTop: 20, marginBottom: 30 },
    slide: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: {
        position: 'relative', width: width * 0.85, height: 240,
        borderRadius: 24, overflow: 'hidden',
        borderWidth: 1, borderColor: theme.border,
    },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.25)' },

    promoBadge: {
        position: 'absolute', top: 16, left: 16,
        backgroundColor: theme.white,
        paddingHorizontal: 12, paddingVertical: 6,
        borderRadius: 20, zIndex: 2,
        borderWidth: 1, borderColor: theme.border,
    },
    promoBadgeText: { color: theme.textDark, fontSize: 12, fontWeight: '700' },
    promoContent: { position: 'absolute', bottom: 24, left: 24, right: 24, zIndex: 2 },
    promoTitle: { color: theme.white, fontSize: 24, fontWeight: '700', marginBottom: 4 },
    promoSubtitle: {
        color: theme.white, fontSize: 16, fontWeight: '400', marginBottom: 16, opacity: 0.9,
    },
    shopNowButton: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: theme.primary,
        paddingHorizontal: 20, paddingVertical: 12,
        borderRadius: 25, alignSelf: 'flex-start',
    },
    shopNowText: { color: theme.white, fontSize: 14, fontWeight: '600', marginRight: 8 },

    paginationContainer: { position: 'absolute', bottom: -10 },
    paginationItem: { width: 6, height: 6, marginHorizontal: 3 },
    paginationItemActive: { backgroundColor: theme.primary, width: 24, borderRadius: 3 },
    paginationItemInactive: { backgroundColor: theme.border },

    actionsContainer: { marginBottom: 30 },
    actionsTitle: { fontSize: 20, fontWeight: '700', color: theme.textDark, marginBottom: 16 },
    actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    actionCard: {
        width: '48%', backgroundColor: theme.white, padding: 20, borderRadius: 16, marginBottom: 12,
        borderWidth: 1, borderColor: '#F3F4F6',
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
        borderTopWidth: 4,
    },
    actionIconContainer: {
        width: 50, height: 50, borderRadius: 25,
        justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    },
    actionTitle: { fontSize: 16, fontWeight: '600', color: theme.textDark, marginBottom: 4 },
    actionSubtitle: { fontSize: 12, color: theme.textMuted, fontWeight: '400' },

    categoriesContainer: { marginBottom: 30 },
    categoriesGrid: { flexDirection: 'row', justifyContent: 'space-between' },
    categoryItem: { alignItems: 'center', width: '23%' },
    categoryIcon: {
        width: 60, height: 60, borderRadius: 30,
        justifyContent: 'center', alignItems: 'center', marginBottom: 8,
        borderWidth: 1, borderColor: 'rgba(31,41,55,0.07)',
    },
    categoryText: { fontSize: 12, fontWeight: '500', color: '#374151', textAlign: 'center' },
});
