package com.resumebuilder.model;

import jakarta.persistence.*;

@Entity
@Table(name = "templates")
public class Template {

    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    private String industryCategory;
    private String layoutStyle;
    private String colorScheme;
    private String fontFamily;
    private boolean premiumOnly;
    private boolean atsFriendly;

    public Template() {}

    public Template(Long id, String name, String industryCategory, String layoutStyle,
                    String colorScheme, String fontFamily, boolean premiumOnly, boolean atsFriendly) {
        this.id = id;
        this.name = name;
        this.industryCategory = industryCategory;
        this.layoutStyle = layoutStyle;
        this.colorScheme = colorScheme;
        this.fontFamily = fontFamily;
        this.premiumOnly = premiumOnly;
        this.atsFriendly = atsFriendly;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIndustryCategory() { return industryCategory; }
    public void setIndustryCategory(String industryCategory) { this.industryCategory = industryCategory; }

    public String getLayoutStyle() { return layoutStyle; }
    public void setLayoutStyle(String layoutStyle) { this.layoutStyle = layoutStyle; }

    public String getColorScheme() { return colorScheme; }
    public void setColorScheme(String colorScheme) { this.colorScheme = colorScheme; }

    public String getFontFamily() { return fontFamily; }
    public void setFontFamily(String fontFamily) { this.fontFamily = fontFamily; }

    public boolean isPremiumOnly() { return premiumOnly; }
    public void setPremiumOnly(boolean premiumOnly) { this.premiumOnly = premiumOnly; }

    public boolean isAtsFriendly() { return atsFriendly; }
    public void setAtsFriendly(boolean atsFriendly) { this.atsFriendly = atsFriendly; }
}
