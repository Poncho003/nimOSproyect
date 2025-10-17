// src/screens/ManScreen.js
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_W = (width - 20 - 20 - 12) / 2;

export default function ManScreen() {
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
                precio: [499, 599, 699, 749][idx % 4],
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
                    <Ionicons name="heart-outline" size={18} color="#00b4d8" />
                </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={styles.title}>
                {item.titulo}
            </Text>
            <Text style={styles.price}>MXN {item.precio}.00</Text>

            <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.roundBtn}>
                    <Ionicons name="cart-outline" size={18} color="#00b4d8" />
                </TouchableOpacity>
                <Text style={styles.tagText}>{item.tag}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#0f172a"
            />
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#e2e8f0" />
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={18} color="#94a3b8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Buscar prendas"
                        placeholderTextColor="#94a3b8"
                        value={query}
                        onChangeText={setQuery}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")}>
                            <Ionicons name="close-circle" size={18} color="#94a3b8" />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity>
                    <Ionicons name="options-outline" size={22} color="#e2e8f0" />
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
                    <Ionicons name="refresh" size={22} color="#00b4d8" />
                    <Text style={{ marginLeft: 6, color: "#00b4d8" }}>Cargando…</Text>
                </View>
            ) : filtered.length === 0 ? (
                <View style={styles.empty}>
                    <Ionicons name="search" size={28} color="#64748b" />
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
        backgroundColor: "#0f172a",
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
        backgroundColor: "#1e293b",
        borderRadius: 12,
        paddingHorizontal: 10,
        height: 40,
    },
    input: { flex: 1, marginHorizontal: 8, color: "#e2e8f0" },

    chipsRow: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 8 },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#1e293b",
        borderRadius: 999,
        marginRight: 8,
    },
    chipActive: { backgroundColor: "#00b4d8" },
    chipText: { color: "#e2e8f0", fontSize: 13, fontWeight: "600" },
    chipTextActive: { color: "#000" },

    loading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    empty: { alignItems: "center", marginTop: 30 },
    emptyText: { color: "#94a3b8", marginTop: 6 },

    card: {
        width: CARD_W,
        backgroundColor: "#1e293b",
        borderRadius: 14,
        marginBottom: 12,
        overflow: "hidden",
        elevation: 4,
    },
    imageWrap: { position: "relative", backgroundColor: "#0f172a" },
    image: { width: "100%", height: 160, resizeMode: "cover" },
    iconCircle: {
        position: "absolute",
        right: 8,
        top: 8,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#0f172acc",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 13,
        color: "#e2e8f0",
        paddingHorizontal: 10,
        paddingTop: 8,
    },
    price: {
        fontSize: 13,
        fontWeight: "700",
        color: "#00b4d8",
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
        backgroundColor: "#0f172a",
        alignItems: "center",
        justifyContent: "center",
    },
    tagText: { fontSize: 11, color: "#94a3b8", fontWeight: "600" },

    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 14,
        backgroundColor: "#1e293b",
        borderTopWidth: 1,
        borderColor: "#334155",
    },
    backBtn: {
        backgroundColor: "#00b4d8",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    backText: { color: "#000", fontWeight: "700", marginLeft: 8 },
});
