package com.ftninformatika.jwd.modul3.cinema.web.controller;

import com.ftninformatika.jwd.modul3.cinema.model.Adresa;
import com.ftninformatika.jwd.modul3.cinema.service.AdresaService;
import com.ftninformatika.jwd.modul3.cinema.support.AdresaDtoToAdresa;
import com.ftninformatika.jwd.modul3.cinema.support.AdresaToAdresaDto;
import com.ftninformatika.jwd.modul3.cinema.web.dto.AdresaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/adrese", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdresaController {

    @Autowired
    private AdresaService adresaService;

    @Autowired
    private AdresaDtoToAdresa toAdresa;

    @Autowired
    private AdresaToAdresaDto toAdresaDto;

   // @PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdresaDTO> create(@RequestBody AdresaDTO adresaDTO){

        Adresa adresa = toAdresa.convert(adresaDTO);
        Adresa sacuvanaAdresa = adresaService.save(adresa);

        return new ResponseEntity<>(toAdresaDto.convert(sacuvanaAdresa), HttpStatus.CREATED);
    }

   // @PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
    @PutMapping(value= "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AdresaDTO> edit( @PathVariable Long id, @RequestBody AdresaDTO adresaDTO){

        if(!id.equals(adresaDTO.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Adresa adresa = toAdresa.convert(adresaDTO);
        Adresa sacuvanaAdresa = adresaService.save(adresa);

        return new ResponseEntity<>(toAdresaDto.convert(sacuvanaAdresa), HttpStatus.OK);
    }

   // @PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){

        Optional<Adresa> adresa = adresaService.findOne(id);
        if(!adresa.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if(!adresa.get().getKorisnici().isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        adresaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

  //  @PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<AdresaDTO> getOne(@PathVariable Long id){
        Adresa adresa = adresaService.findOne(id).get();

        if(adresa != null) {
            return new ResponseEntity<>(toAdresaDto.convert(adresa), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

   // @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public ResponseEntity<List<AdresaDTO>> getAll(){

        List<Adresa> adrese = adresaService.findAll();

        return new ResponseEntity<>(toAdresaDto.convert(adrese), HttpStatus.OK);
    }
}
