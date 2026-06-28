# herdr Playbook — Monitoring pi Over SSH

## Purpose

Reference for monitoring a pi coding-agent session from a remote, keyboard-only context: an iPad over SSH, a small Bluetooth keyboard, a hunt-and-peck layout with 1.5× text size for readability. Mouse doesn't work over SSH, so everything is keyboard. This file captures the load-bearing shortcuts and the habits that make remote monitoring low-friction.

## The Context

- **Remote:** iPad (or similar) over SSH into the machine running pi.
- **No mouse:** selection, scrolling, and navigation are all keyboard.
- **Small / unfamiliar keyboard:** a hunt-and-peck layout; modifier combos can be unreliable.
- **Readability:** reading spectacles at 1.5× magnification to see the small screen text; less screen noise is better (the `ctrl+o` trick halves what you have to wade through).
- **Posture:** monitoring, not driving. You're watching the agent grind, catching drift at commit boundaries, interjecting only when the work goes somewhere wrong.

## The Essential Four

For monitoring a running session, these are the only keys that matter. Everything else is optional.

| Key | What | When you use it |
|-----|------|-----------------|
| `PgDn` | Scroll the conversation down a page | To read the agent's latest prose and commits |
| `ctrl+o` | Collapse / expand tool output | To hide the bash/edit noise and see just the agent's words; toggle again to bring the tool calls back |
| `escape` | Interrupt the agent mid-response | Your "stop" button — if the work is drifting, hit this then type |
| `enter` | Send what you've typed | To send a one-line "halt" or redirect |

That's the whole game for watching. Page down to read, `ctrl+o` to de-noise, `escape` to stop, `enter` to speak.

## The Next Eight (nice to have)

Useful once you're comfortable, or when you need to type a multi-line message.

| Key | What | Notes |
|-----|------|-------|
| `PgUp` | Scroll up a page | Review what the agent said earlier |
| `Up` / `Down` | Scroll line-by-line | Finer review |
| `shift+enter` (or `ctrl+j`) | New line inside your message | For a paragraph break before sending. `ctrl+j` is the fallback if `shift+enter` is intercepted by the SSH keyboard map |
| `ctrl+w` | Delete the word behind the cursor | Faster than backspace-mashing on a small keyboard |
| `ctrl+c` | Clear the input editor | When you've typed garbage and want a clean slate |
| `ctrl+d` | Exit pi | Only works when the editor is empty — hit `ctrl+c` first if there's text |
| `ctrl+t` | Collapse / expand "thinking" blocks | Hide the agent's reasoning traces if they're noisy |
| `ctrl+l` | Open the model selector | Rarely needed for monitoring |

## The `ctrl+o` Trick (the big one for readability)

Agent responses are full of `bash`, `edit`, and tool-call output that reads like terminal soup. `ctrl+o` folds all of that away and leaves just the prose and the commit messages. Toggle it once and the 1.5× reader has half as much to wade through. Toggle it again when you want to see what the agent actually did beneath the prose.

**Default recommendation for remote monitoring:** keep tool output collapsed (`ctrl+o` once at session start). Expand it only when you want to verify a specific command or file change.

## iPad / SSH Keyboard Caveats

- **`ctrl+enter` vs `enter`:** the Magic Keyboard's `ctrl` is reliable; third-party Bluetooth keyboards may send `ctrl+enter` as plain `enter`. If `shift+enter` for a newline doesn't work, use `ctrl+j` — same effect, less likely to be intercepted.
- **`ctrl+o` doing nothing:** it's the SSH keyboard map, not pi. You'll have to read tool output unfiltered (still readable, just noisier). On the Magic Keyboard it works.
- **Modifier combos on a hunt-and-peck layout:** `ctrl+w` and `ctrl+c` are the two worth memorising — they save the most keystrokes. The rest are luxuries.
- **The `escape` key:** on the Magic Keyboard it's the `esc` key (top-left). On a Bluetooth keyboard without a dedicated `esc`, it's often mapped to `ctrl+[`. If neither works, `ctrl+c` will also interrupt, though it clears the input editor at the same time.

## Monitoring Habits (the part that's not keystrokes)

- **Watch the commits, not the keystrokes.** The agent keeps commits atomic and messages descriptive, so the git log reads as a progress narrative on its own. If a commit's message looks wrong or a task is heading somewhere unintended, that's the moment to interject — not mid-response.
- **Trust the build-green output and the rg scans.** The agent does empirical verification (`just build`, regex checks) and reports the result in prose. Over SSH you can't easily click through rendered HTML, so trust the green build and the scan counts; save the browser click-through for when you're back at a real screen.
- **Interject at commit boundaries.** Hitting `escape` mid-response works, but the cleaner intervention is to let the current unit of work land (a commit), then redirect. The agent's commits are self-contained and reviewable, so a mid-stream interrupt is rarely necessary.
- **One line is enough.** A redirect doesn't need a paragraph. "halt," "stop after this commit," "switch to the math task" — the agent takes short instructions well. Type it, `enter`, done.

## When You Want to Drive (not just monitor)

If you switch from watching to steering, the keys you'll add:

| Key | What |
|-----|------|
| `ctrl+l` | Open the model selector (switch models mid-session) |
| `ctrl+p` | Cycle to the next model |
| `shift+tab` | Cycle the thinking level (more / less reasoning before responses) |
| `alt+enter` | Queue a follow-up message (compose the next prompt while the agent is still working) |
| `alt+up` | Restore queued messages to the editor |
| `ctrl+g` | Open the current input in an external editor (`$VISUAL` / `$EDITOR`) — useful for composing a long prompt on a small keyboard |

For the full keybinding reference (session tree, scoped models, kill ring, vim/emacs layouts), see the pi docs at `docs/keybindings.md` — but none of it is needed for monitoring.

## Keybindings Are Customisable

All shortcuts live in `~/.pi/agent/keybindings.json` and can be rebound. Each action takes a single key or an array of keys (user config overrides defaults). After editing, run `/reload` in pi to apply without restarting.

If the iPad keyboard makes a particular combo unbearable, rebind it. Example — make `ctrl+o` also respond to `ctrl+n` (if `o` is hard to reach on your layout):

```json
{
  "app.tools.expand": ["ctrl+o", "ctrl+n"]
}
```

The full action list is in `docs/keybindings.md`; the load-bearing ids for monitoring are `app.tools.expand` (`ctrl+o`) and `app.interrupt` (`escape`).

## Related

- `docs/keybindings.md` (in the pi installation) — the complete keybinding reference
- `~/.pi/agent/keybindings.json` — custom rebinds
