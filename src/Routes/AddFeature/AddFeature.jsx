import React, { useState } from "react";
import "./AddFeature.css";

const preexistingIcons = [
    '❄️', '⛽', '🔌', '🚦', '🔧', '🏁', '🚲', '🔊', '📻', '🚘',
    '🛢️', '🔋', '🔌', '🌍', '💡', '🚥', '🚧', '🚨', '🔩', '🚢',
    '🚛', '🏎️', '🚴', '🚆', '🔄'
];

const AddFeature = () => {
    const [features, setFeature] = useState([]);
    const [newFeature, setNewFeature] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(preexistingIcons[0]);
    const [editingIndex, setEditingIndex] = useState(null);

const formatText = (text) => {
    const formattedText = text
        .replace(/[^a-zA-Z ]/g, "")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    return formattedText;
};

const handleAddFeature = () => {
    if (newFeature) {
        const formattedText = formatText(newFeature);
        if (editingIndex !== null) {
            const confirmation = window.confirm(
            "¿Estás seguro de que deseas guardar los cambios?"
        );

        if (confirmation) {
            const updatedFeatures = [...features];
            updatedFeatures[editingIndex] = {
                name: formattedText,
                icon: selectedIcon
        };
            setFeature(updatedFeatures);
            setEditingIndex(null);
            setNewFeature("");
            setSelectedIcon(preexistingIcons[0]);
        }
        } else {
        const newFeaturesList = [
            ...features,
            { name: formattedText, icon: selectedIcon }
        ];
        setFeature(newFeaturesList);
        setNewFeature("");
        setSelectedIcon(preexistingIcons[0]);
        }
    }
};

const handleEditFeature = (index) => {
    const characteristicToEdit = features[index];
    setNewFeature(characteristicToEdit.name);
    setSelectedIcon(characteristicToEdit.icon);
    setEditingIndex(index);
};

const handleDeleteFeature = (index) => {
    const confirmation = window.confirm(
        "¿Estás seguro de que deseas eliminar esta característica?"
    );

    if (confirmation) {
        const newFeaturesList = features.filter(
        (_, i) => i !== index
        );
        setFeature(newFeaturesList);
        setEditingIndex(null);
    }
};

return (
    <div>
        <h2>Características</h2>
        <ul>
        {features.map((char, index) => (
            <li key={index}>
                {char.name}
                <span className="icon">{char.icon}</span>
            <button onClick={() => handleEditFeature(index)}>
                Editar
            </button>
            <button onClick={() => handleDeleteFeature(index)}>
                Eliminar
            </button>
            </li>
        ))}
        </ul>

    <div id="form-feature">
        <h3>Añadir nueva característica</h3>
        <label>Nombre:</label>
        <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
        />

        <label>Icono:</label>
        <select
            value={selectedIcon}
            onChange={(e) => setSelectedIcon(e.target.value)}
        >
            {preexistingIcons.map((icon, index) => (
            <option key={index} value={icon}>
                {icon}
            </option>
        ))}
        </select>
        <button onClick={handleAddFeature}>
            {editingIndex !== null ? "Guardar cambios" : "Añadir nueva"}
        </button>
        </div>
    </div>
    );
};

export default AddFeature;