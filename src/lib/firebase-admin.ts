import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { Property } from "@/types/property";

let adminApp: App;
let adminDb: Firestore;

// Validate environment variables
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
    console.error("Missing Firebase Admin environment variables!");
    console.error("PROJECT_ID:", !!projectId);
    console.error("CLIENT_EMAIL:", !!clientEmail);
    console.error("PRIVATE_KEY:", !!privateKey);
    throw new Error("Firebase Admin SDK environment variables are not configured");
}

if (!getApps().length) {
    adminApp = initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
    });

    adminDb = getFirestore(adminApp);
} else {
    adminApp = getApps()[0];
    adminDb = getFirestore(adminApp);
}


async function getProperty(id: string): Promise<Property | null> {
    const docRef = adminDb.collection("properties").doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) return null;
    return { id: docSnap.id, ...docSnap.data() } as Property;
}

export { adminApp, adminDb, getProperty };
export type { Property }; 
