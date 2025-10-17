// src/screens/ClWomenScreen.js
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_W = (width - 20 - 20 - 12) / 2;

export default function ClWomenScreen() {
    const navigation = useNavigation();
    const [promos, setPromos] = useState([]);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("Todos");
    const [loading, setLoading] = useState(true);

    async function getPromos() {
        try {
            const res = await fetch("http://192.168.1.13:3000/promos");
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("Error cargando promos:", e);
            return [];
        }
    }

    const getImage = (name) => {
        switch (name) {
            case "promo1.jpg":
                return require("../../assets/promos/promo1.jpg");
            case "promo2.jpg":
                return require("../../assets/promos/promo2.jpg");
            case "promo3.jpg":
                return require("../../assets/promos/promo3.jpg");
            default:
                return require("../../assets/promos/promo1.jpg");
        }
    };

    useEffect(() => {
        (async () => {
            const data = await getPromos();
            const withMeta = data.map((p, idx) => ({
                ...p,
                precio: [389, 459, 599, 649][idx % 4],
                tag: idx % 2 === 0 ? "Ofertas" : "Nuevos",
            }));
            setPromos(withMeta);
            setLoading(false);
        })();
    }, []);

    const filtered = useMemo(() => {
        return promos
            .filter((p) =>
                p.titulo.toLowerCase().includes(query.trim().toLowerCase())
            )
            .filter((p) => (filter === "Todos" ? true : p.tag === filter));
    }, [promos, query, filter]);

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
            <View style={styles.imageWrap}>
                <Image source={getImage(item.imagen)} style={styles.image} />
                <TouchableOpacity style={styles.iconCircle}>
                    <Ionicons name="heart-outline" size={18} color="#4a044e" />
                </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={styles.title}>
                {item.titulo}
            </Text>
            <Text style={styles.price}>MXN {item.precio}.00</Text>

            <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.roundBtn}>
                    <Ionicons name="cart-outline" size={18} color="#4a044e" />
                </TouchableOpacity>
                <Text style={styles.tagText}>{item.tag}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
                backgroundColor="#fff"
            />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#4a044e" />
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={18} color="#c084fc" />
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar prendas"
                        placeholderTextColor="#d6b2f0"
                        value={query}
                        onChangeText={setQuery}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Ionicons name="close-circle" size={18} color="#c084fc" />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity>
                    <Ionicons name="options-outline" size={22} color="#4a044e" />
                </TouchableOpacity>
            </View>
            <View style={styles.chipsRow}>
                {["Todos", "Nuevos", "Ofertas"].map((c) => (
                    <TouchableOpacity
                        key={c}
                        onPress={() => setFilter(c)}
                        style={[styles.chip, filter === c && styles.chipActive]}
                    >
                        <Text
                            style={[styles.chipText, filter === c && styles.chipTextActive]}
                        >
                            {c}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {loading ? (
                <View style={styles.loading}>
                    <Ionicons name="refresh" size={22} color="#f472b6" />
                    <Text style={{ marginLeft: 6, color: "#f472b6" }}>Cargando…</Text>
                </View>
            ) : filtered.length === 0 ? (
                <View style={styles.empty}>
                    <Ionicons name="search" size={28} color="#f9a8d4" />
                    <Text style={styles.emptyText}>Sin resultados</Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    numColumns={2}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                    }}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 90 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={22}
                        color="#fff"
                    />
                    <Text style={styles.backText}>Regresar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 6,
        paddingBottom: 10,
        justifyContent: "space-between",
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: "#fce7f3",
        borderRadius: 12,
        paddingHorizontal: 10,
        height: 40,
    },
    input: { flex: 1, marginHorizontal: 8, color: "#4a044e" },

    chipsRow: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 8 },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#fde2e4",
        borderRadius: 999,
        marginRight: 8,
    },
    chipActive: { backgroundColor: "#f472b6" },
    chipText: { color: "#4a044e", fontSize: 13, fontWeight: "600" },
    chipTextActive: { color: "#fff" },

    loading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    empty: { alignItems: "center", marginTop: 30 },
    emptyText: { color: "#f9a8d4", marginTop: 6 },

    card: {
        width: CARD_W,
        backgroundColor: "#fff",
        borderRadius: 14,
        marginBottom: 12,
        overflow: "hidden",
        elevation: 3,
    },
    imageWrap: { position: "relative", backgroundColor: "#fdf2f8" },
    image: { width: "100%", height: 160, resizeMode: "cover" },
    iconCircle: {
        position: "absolute",
        right: 8,
        top: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#ffffffcc",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 13,
        color: "#4a044e",
        paddingHorizontal: 10,
        paddingTop: 8,
    },
    price: {
        fontSize: 13,
        fontWeight: "700",
        color: "#f472b6",
        paddingHorizontal: 10,
        paddingTop: 4,
    },
    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    roundBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#fce7f3",
        alignItems: "center",
        justifyContent: "center",
    },
    tagText: { fontSize: 11, color: "#a21caf", fontWeight: "600" },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 14,
        backgroundColor: "#ffffffee",
        borderTopWidth: 1,
        borderColor: "#fbcfe8",
    },
    backBtn: {
        backgroundColor: "#f472b6",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    backText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
});
