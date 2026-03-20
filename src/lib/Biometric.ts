// utils/biometric.ts
import { NativeBiometric } from 'capacitor-native-biometric';

export async function isBiometricAvailable(): Promise<boolean> {
    try {
        const result = await NativeBiometric.isAvailable();
        return result.isAvailable;
    } catch {
        return false;
    }
}

export async function authenticateBiometric(): Promise<boolean> {
    try {
        await NativeBiometric.verifyIdentity({
            reason: 'Acesse com biometria',
            title: 'Autenticação',
            subtitle: 'Use sua biometria',
            description: 'Confirme sua identidade'
        });
        return true;
    } catch {
        return false;
    }
}