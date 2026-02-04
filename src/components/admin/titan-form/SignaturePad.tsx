"use client";

import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, Check } from 'lucide-react';

interface SignaturePadProps {
    onSave: (signatureData: string) => void;
}

export default function SignaturePad({ onSave }: SignaturePadProps) {
    const sigCanvas = useRef<SignatureCanvas>(null);

    const clear = () => sigCanvas.current?.clear();

    const save = () => {
        if (sigCanvas.current) {
            // Trim creates a white background, we might want transparent. 
            // For better PDF compatibility, png is fine.
            onSave(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
        }
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-brand-coffee-light p-2 flex justify-between items-center border-b border-brand-coffee-dark/10">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-2">Firme aquí</span>
                <button onClick={clear} className="text-red-500 text-xs flex items-center gap-1 hover:bg-red-50 p-1 rounded">
                    <Eraser className="w-3 h-3" /> Borrar
                </button>
            </div>

            <div className="cursor-crosshair bg-white">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'signature-canvas'
                    }}
                    backgroundColor="rgba(255,255,255,1)"
                />
            </div>

            <div className="p-3 bg-gray-50 border-t flex justify-end">
                <button
                    onClick={save}
                    className="bg-brand-gold text-brand-coffee-dark px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
                >
                    <Check className="w-4 h-4" /> Guardar Firma
                </button>
            </div>
        </div>
    );
}
