package com.example.cw2.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "bioid")
public class BioID implements Serializable {
    private static final Set<String> ALLOWED_CODES = Set.of("1K3JTWHA05","1PUQV970LA","2BIB99Z54V","2WYIM3QCK9",
            "30MY51J1CJ","340B1EOCMG","49YFTUA96K","4HTOAI9YKO","6EBQ28A62V","6X6I6TSUFG","7DMPYAZAP2","88V3GKIVSF",
            "8OLYIE2FRC","9JSXWO4LGH","ABQYUQCQS2","AT66BX2FXM","BPX8O0YB5L","BZW5WWDMUY","C7IFP4VWIL","CCU1D7QXDT",
            "CET8NUAE09","CG1I9SABLL","D05HPPQNJ4","DHKFIYHMAZ","E7D6YUPQ6J","F3ATSRR5DQ","FH6260T08H","FINNMWJY0G",
            "FPALKDEL5T","GOYWJVDA8A","H5C98XCENC","JHDCXB62SA","K1YL8VA2HG","LZK7P0X0LQ","O0V55ENOT0","O3WJFGR5WE",
            "PD6XPNB80J","PGPVG5RF42","QJXQOUPTH9","QTLCWUS8NB","RYU8VSS4N5","S22A588D75","SEIQTS1H16","TLFDFY7RDG",
            "TTK74SYYAN","V2JX0IC633","V30EPKZQI2","VQKBGSE3EA","X16V7LFHR2","Y4FC3F9ZGS");

    @Id
    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "used")
    private Integer used;

    public void Bioid() {
    }

    public void Bioid(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        if (!ALLOWED_CODES.contains(code)) {
            throw new IllegalArgumentException("Invalid BioID: " + code);
        }
        this.code = code;
    }

    public Integer getUsed() {
        return used;
    }

    public void setUsed(Integer used) {
        this.used = used;
    }

}