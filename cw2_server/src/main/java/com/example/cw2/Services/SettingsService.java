package com.example.cw2.Services;
import com.example.cw2.Interfaces.SettingsRepository;
import com.example.cw2.Models.Settings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository settingsRepository;

    public String getSettingValue(int id) {
        Settings setting =  settingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Setting not found for ID: " + id));
        return setting.getValue();
    }

    public void updateSetting(int id, String value) {
        Settings setting = settingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Setting not found"));
        setting.setValue(value);
        setting.setUpdatedAt(LocalDateTime.now());
        settingsRepository.save(setting);
    }

    public void newSetting(Settings setting) {
        settingsRepository.save(setting);
    }
}
