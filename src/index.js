const sc = require('supercolliderjs');

sc.server
  .boot({
    sclang: '/usr/bin/sclang',
    scsynth: '/usr/bin/scsynth',
  })
  .then(async (server) => {

    const waves = server.synthDef(
      'waves',
      ` 
      SynthDef(\\waves, {
      arg freq = 440, dur = 1, amp = 1, feedback = 1, out = 0, gate=0;
    
      var noise = { WhiteNoise.ar(0.04 + LFNoise1.kr(0.3, 0.03)) };
      var motion = { LFNoise1.kr(0.2).exprange(100, 2000) };
      var hps = { HPF.ar(noise.value, 50) };
      var wave = { LPF.ar(hps.value, motion.value).tanh };
      var sig = wave!10;
      sig = Splay.ar(sig, 0.6).tanh;
      sig = sig * Line.kr(0, 1, 10); // fade in
      LeakDC.ar(sig) * 15;
    
      Out.ar(out, sig * amp * 20);
    });
    `,
    );


    server.synth(
      waves,
    );


  })
  .catch((error) => {
    console.log(error);
  });
