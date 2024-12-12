import React from 'react';
import styles from './index.module.scss';

interface FavoriteFilterProps {
    showFavorites: boolean;
    onToggle: () => void;
}

export const FavoriteFilter: React.FC<FavoriteFilterProps> = ({ showFavorites, onToggle }) => {
    return (
        <label className={styles.label}>
            <input
                type="checkbox"
                checked={showFavorites}
                onChange={onToggle}
            />
            Показать только избранные
        </label>
    );
};